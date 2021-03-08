import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceViewComponent } from './components/resource-view/resource-view.component';
import { LandingComponent } from './components/landing/landing.component';

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
    path: '',
    component: LandingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
