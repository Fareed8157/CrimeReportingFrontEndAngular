import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms'
import { ClientRoutingModule } from './client-routing.module';
import { FirComponent } from './fir/fir.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {HttpClientModule} from "@angular/common/http"


@NgModule({
  declarations: [FirComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    ClientRoutingModule
  ],
})
export class ClientModule { }
