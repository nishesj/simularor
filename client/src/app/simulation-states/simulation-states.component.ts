import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export enum SimulationProcessState {
  READY,
  SIMULATING,
  DONE,
}

@Component({
  selector: 'app-simulation-states',
  templateUrl: './simulation-states.component.html',
  styleUrls: ['./simulation-states.component.scss'],
})
export class SimulationStatesComponent implements OnInit {
  @Input() simulationProcessState: SimulationProcessState =
    SimulationProcessState.READY;

  @Output() restart: EventEmitter<void> = new EventEmitter<void>();
  @Output() start: EventEmitter<void> = new EventEmitter<void>();
  @Output() finished: EventEmitter<void> = new EventEmitter<void>();

  SimulationProcessState = SimulationProcessState;

  constructor() {}

  ngOnInit(): void {}

  startPressed(): void {
    this.start.emit();
  }

  finishPressed(): void {
    this.finished.emit();
  }

  restartPressed(): void {
    this.restart.emit();
  }
}
