import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceViewComponent } from './components/resource-view/resource-view.component';
import { LandingComponent } from './components/landing/landing.component';
import {SparqlViewComponent} from './components/sparql-view/sparql-view.component'

const routes: Routes = [
  {
    path: 'resource',
    children: [
      {
        path: '**',
        component: ResourceViewComponent
      }
    ]
  },
  {
    path: 'sparql',
    children: [
      {
        path: '**',
        component: SparqlViewComponent
      }
    ]
  },
  {
    path: '',
    component: LandingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
