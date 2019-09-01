import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms'
import { ClientRoutingModule } from './client-routing.module';
import { FirComponent } from './fir/fir.component';
import {HttpClientModule} from "@angular/common/http"
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown-angular7';
import { ViewFirComponent } from './view-fir/view-fir.component';
import { NcComponent } from './nc/nc.component';
import { ViewNcComponent } from './view-nc/view-nc.component';


@NgModule({
  declarations: [FirComponent, ViewFirComponent, NcComponent, ViewNcComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    ClientRoutingModule
  ],
})
export class ClientModule { }
