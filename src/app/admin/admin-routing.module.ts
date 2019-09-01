import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { CriminalComponent } from './criminal/criminal.component';
import { ViewCriminalComponent } from './view-criminal/view-criminal.component';
import { AuthGuard } from '../auth.guard';
import { ViewAllFirsComponent } from './view-all-firs/view-all-firs.component';
import { ViewAdminNCComponent } from './view-admin-nc/view-admin-nc.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,canActivate:[AuthGuard],data:{role:['ADMIN']},
    children: [
      {
      path: '',
      children: [
        // { path: 'blogs', component: ManageBlogsComponent },
        // { path: 'categories', component: ManageCategoriesComponent },
        { 
          path: 'criminal', 
          children:[
            {path:'',component:CriminalComponent},
            {path:'viewCriminal',component:ViewCriminalComponent},
            {path:'edit/:id',component:CriminalComponent}
          ]
        },
        {
          path:'viewFirs',component:ViewAllFirsComponent
        },
        {
          path:'viewNCs',component:ViewAdminNCComponent
        },
        { path: '', component: AdminDashboardComponent }
      ],
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
