import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimulationSummaryComponent } from './simulation-summary/simulation-summary.component';
import { SimulationStatesComponent } from './simulation-states/simulation-states.component';

@NgModule({
  declarations: [AppComponent, SimulationSummaryComponent, SimulationStatesComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
