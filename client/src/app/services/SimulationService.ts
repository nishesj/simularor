import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

export interface Match {
  team1: string;
  team2: string;
}

export interface MatchesResponse {
  id: string;
  matches: Match[];
  scores: { [key: string]: number };
  totalScore: number;
}

@Injectable({
  providedIn: 'root',
})
export class SimulationService {
  constructor(private http: HttpClient) {}

  getMatches(): Observable<MatchesResponse> {
    return this.http.get<MatchesResponse>(`${environment.simulationApiUrl}`);
  }

  simulate(): WebSocketSubject<any> {
    const url = new URL(environment.simulationWsUrl, location.href);
    url.protocol = url.protocol.replace('http', 'ws');
    return webSocket<any>(url.toString());
  }
}
