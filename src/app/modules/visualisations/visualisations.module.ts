import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { VisualisationsLandingComponent } from './visualisations-landing/visualisations-landing.component';
import { VisualisationsRoutingModule } from './visualisations-routing.module';
import { LocalCityVisualisationComponent } from './local-city-visualisation/local-city-visualisation.component';
import { MatCardModule, MatDividerModule, MatGridListModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [VisualisationsLandingComponent, LocalCityVisualisationComponent],
  imports: [
    CommonModule,
    VisualisationsRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    SharedModule
  ]
})
export class VisualisationsModule { }
