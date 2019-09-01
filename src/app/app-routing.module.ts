import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'',redirectTo:'',pathMatch:'full'},
  {path:'signup',component:SignupComponent},
  {path:'addEmployee',component:SignupComponent},
  {path:'pageNotFound',component:PageNotFoundComponent},
  {path:'**',component:PageNotFoundComponent}
  
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
