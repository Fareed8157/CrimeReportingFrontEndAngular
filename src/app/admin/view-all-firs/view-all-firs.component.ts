import { Component, OnInit } from '@angular/core';
import { FirService } from 'src/app/client/services/fir.service';
import { FormBuilder } from '@angular/forms';
import { LoginAuthService } from 'src/app/login-auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Fir } from 'src/app/client/models/fir.model';

@Component({
  selector: 'app-view-all-firs',
  templateUrl: './view-all-firs.component.html',
  styleUrls: ['./view-all-firs.component.css']
})
export class ViewAllFirsComponent implements OnInit {

  noOfFirs:any=0;
  myModel:any;
  pendingOrSubmitted:any;

  userFirs:Fir[]=[];
  
  constructor(private fb:FormBuilder,private firService:FirService
    ,private authService:LoginAuthService,private toastr:ToastrService,private router:Router) {
      this.authService.isLoggedIn();
     }

  ngOnInit() {
    this.showAllFirs();
    this.firService.adminMessage$.subscribe((message)=>{
      if(message=="Fir Submitted")
        this.showAllFirs();
    })
  }
  showAllFirs() {
    this.firService.getAllFirsByPoliceStation().subscribe((response)=>{
      console.log('All firs By PoliceStation');
      this.userFirs=response;
      console.log(this.userFirs);
    });
  }

  
  calculateNoOfPendingFirs() {
    for (let index = 0; index < this.userFirs.length; index++) {
      const element = this.userFirs[index];
      if(element.status==false){
        this.noOfFirs++;
        console.log("false");
      }
    }
  }
  getColor(flag) { 
    switch (flag) {
      case true:
        {
          this.pendingOrSubmitted="Submitted";
          return 'badge statusDivSuccess';
        }
      case false:
        {
          this.pendingOrSubmitted="Pending";
          return 'badge statusDivPending';
        }
      
    }
  }
  toggleButton(id:any){
    console.log(this.myModel);
    this.firService.changeStatusOfFir(id).subscribe((response)=>{
      console.log(response)
      this.firService.sendMessage(response.message);
    });
    console.log(id);
  }

  viewFir(id:any){
    this.router.navigate(['fir/view',id]);
  }
}
