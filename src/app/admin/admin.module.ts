import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'
import {ReactiveFormsModule} from '@angular/forms'
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { CarouselComponent } from './carousel/carousel.component';
import {HttpClientModule} from '@angular/common/http';
import { CriminalComponent } from './criminal/criminal.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown-angular7';
import { ViewCriminalComponent } from './view-criminal/view-criminal.component';
import {MatButtonModule, MatSlideToggleModule} from '@angular/material';
import { ViewAllFirsComponent } from './view-all-firs/view-all-firs.component';
import { ViewAdminNCComponent } from './view-admin-nc/view-admin-nc.component';
 

@NgModule({
  declarations: [AdminDashboardComponent, AdminComponent, CarouselComponent, CriminalComponent, ViewCriminalComponent, ViewAllFirsComponent, ViewAdminNCComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    AdminRoutingModule,
    MatSlideToggleModule
  ],
  exports:[CarouselComponent]
})
export class AdminModule { }
