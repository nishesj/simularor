import { Component } from '@angular/core';
import { catchError, of, ReplaySubject, Subject, tap } from 'rxjs';
import {
  MatchesResponse,
  SimulationService,
} from './services/SimulationService';
import { SimulationProcessState } from './simulation-states/simulation-states.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  matchesResponse$: ReplaySubject<MatchesResponse> =
    new ReplaySubject<MatchesResponse>();
  loadingError$ = new Subject<boolean>();
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

  start(matchesResponse: MatchesResponse): void {
    this.simulationProcessState = SimulationProcessState.SIMULATING;
  }

  finished(matchesResponse: MatchesResponse): void {
    this.simulationProcessState = SimulationProcessState.DONE;
  }

  restart() {
    this.loadInitialData();
  }
}
