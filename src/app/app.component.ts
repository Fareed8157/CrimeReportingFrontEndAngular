import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginAuthService } from './login-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public currentStatus:any;
  constructor(public router:Router,private authService:LoginAuthService){
    this.currentStatus=this.authService.getStatus().subscribe(currentStatus=>{
      this.currentStatus=currentStatus;
    });
    console.log(this.currentStatus);
  }
  title = 'crud-demo';
}
