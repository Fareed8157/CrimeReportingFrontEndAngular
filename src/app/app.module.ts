import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BodyContentComponent } from './body-content/body-content.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyContentComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    ClientModule,
    AdminModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
