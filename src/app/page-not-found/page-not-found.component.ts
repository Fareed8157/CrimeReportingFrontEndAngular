import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginAuthService } from '../login-auth.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  public currentStatus:any;
  constructor(public router:Router,private authService:LoginAuthService){
    
    this.authService.isLoggedIn();
    console.log(this.currentStatus);
  }

  ngOnInit() {

  }

  gotoHome(){
    this.router.navigate(['/']);
  }

}
