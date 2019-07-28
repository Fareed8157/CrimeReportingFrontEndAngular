import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirComponent } from './fir/fir.component';

const routes: Routes = [
  {
    path: 'fir',component:FirComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
