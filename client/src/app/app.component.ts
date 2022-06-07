import { Component } from '@angular/core';
import { catchError, of, ReplaySubject, Subject, tap } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import {
  MatchesResponse,
  SimulationService,
} from './services/SimulationService';
import { SimulationProcessState } from './simulation-states/simulation-states.component';

interface SimulationWsResponse {
  state: 'SIMULATING' | 'DONE';
  payload: MatchesResponse;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  matchesResponse$: ReplaySubject<MatchesResponse> =
    new ReplaySubject<MatchesResponse>();
  loadingError$ = new Subject<boolean>();
  ws$!: WebSocketSubject<any>;

  simulationProcessState: SimulationProcessState = SimulationProcessState.READY;

  constructor(private simulationService: SimulationService) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    // load initital data
    this.simulationService
      .getMatches()
      .pipe(
        catchError((error) => {
          console.error('error loading matches for simulation', error);
          this.loadingError$.next(true);
          return of();
        }),
        tap(() => {
          this.simulationProcessState = SimulationProcessState.READY;
        })
      )
      .subscribe({
        next: (data) => this.matchesResponse$.next(data),
      });
  }

  readWsResponse(response: SimulationWsResponse): void {
    this.matchesResponse$.next(response.payload);
    if (response.state == 'DONE') {
      this.disconnectWs();
    }
  }

  start(matchesResponse: MatchesResponse): void {
    this.ws$ = this.simulationService.simulate();
    this.ws$.subscribe({
      next: (res) => this.readWsResponse(res),
      error: () => this.disconnectWs(),
    });
    const message = { command: 'START_SIMULATION', payload: matchesResponse };
    this.ws$.next(message);
    this.simulationProcessState = SimulationProcessState.SIMULATING;
  }

  finished(matchesResponse: MatchesResponse): void {
    const message = { command: 'STOP_SIMULATION', payload: matchesResponse };
    this.ws$.next(message);
    this.disconnectWs();
  }

  disconnectWs(): void {
    this.ws$.unsubscribe();
    this.simulationProcessState = SimulationProcessState.DONE;
  }

  restart() {
    this.loadInitialData();
  }
}
