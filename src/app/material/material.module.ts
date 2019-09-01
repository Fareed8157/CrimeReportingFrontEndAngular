import { NgModule } from '@angular/core';
import {MatButtonModule, MatSlideToggleModule} from '@angular/material';

const MaterialComponents=[
  MatButtonModule,
  MatSlideToggleModule
]

@NgModule({
  imports: [MaterialComponents],
  exports:[MaterialComponents]
})
export class MaterialModule { }
