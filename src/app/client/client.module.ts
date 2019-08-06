import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms'
import { ClientRoutingModule } from './client-routing.module';
import { FirComponent } from './fir/fir.component';
import {HttpClientModule} from "@angular/common/http"
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [FirComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    ClientRoutingModule
  ],
})
export class ClientModule { }
