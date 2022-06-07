import { Component } from '@angular/core';
import { catchError, of, ReplaySubject, Subject } from 'rxjs';
import {
  MatchesResponse,
  SimulationService,
} from './services/SimulationService';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  matchesResponse$: ReplaySubject<MatchesResponse> =
    new ReplaySubject<MatchesResponse>();
  loadingError$ = new Subject<boolean>();
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
        })
      )
      .subscribe({
        next: (data) => this.matchesResponse$.next(data),
      });
  }
}
