import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirComponent } from './fir/fir.component';
import { AuthGuard } from '../auth.guard';
import { ViewFirComponent } from './view-fir/view-fir.component';
import { NcComponent } from './nc/nc.component';
import { ViewNcComponent } from './view-nc/view-nc.component';

const routes: Routes = [
  {
    path: 'fir',
    component:FirComponent,canActivate:[AuthGuard],
  },
  {path:'fir/view/:id',component:ViewFirComponent,canActivate:[AuthGuard]},
  {
    path:'nc',component:NcComponent,canActivate:[AuthGuard],
  },
  {path:'nc/view/:id',component:ViewNcComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
