import { Component, Input, OnInit } from '@angular/core';
import { MatchesResponse } from '../services/SimulationService';

@Component({
  selector: 'app-simulation-summary',
  templateUrl: './simulation-summary.component.html',
  styleUrls: ['./simulation-summary.component.scss']
})
export class SimulationSummaryComponent implements OnInit {

  @Input() matchesResponse!: MatchesResponse; 

  constructor() { }

  ngOnInit(): void {
  }

}
