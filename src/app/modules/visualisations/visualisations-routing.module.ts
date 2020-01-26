import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { VisualisationsLandingComponent } from './visualisations-landing/visualisations-landing.component';

const visualisationRoutes: Routes = [
    { path: 'visualisations', component: VisualisationsLandingComponent },
];

@NgModule({
    imports: [RouterModule.forChild(visualisationRoutes)],
    exports: [RouterModule]
})
export class VisualisationsRoutingModule { }
