import { Component, OnInit } from '@angular/core';
import { LoginAuthService } from '../login-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public currentStatus:any;

  constructor(private authService:LoginAuthService,private router:Router) {
    this.currentStatus=this.authService.getStatus().subscribe(currentStatus=>{
      this.currentStatus=currentStatus;
    });
    console.log(this.currentStatus);
   }

  ngOnInit() {
  }

  logout(){
    console.log(this.currentStatus);
    localStorage.removeItem('currentUser');
    this.router.navigate(['signup']);
    
  }
}
