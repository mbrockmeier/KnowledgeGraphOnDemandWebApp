import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceViewComponent } from './components/resource-view/resource-view.component';

const routes: Routes = [
  {
    path: 'resource',
    children: [
      {
        path: '**',
        component: ResourceViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
