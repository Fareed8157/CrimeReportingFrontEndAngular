import { Component, OnInit } from '@angular/core';
import { FirService } from 'src/app/client/services/fir.service';
import { LoginAuthService } from 'src/app/login-auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NcService } from 'src/app/client/services/nc.service';
import { NC } from 'src/app/client/models/nc.model';

@Component({
  selector: 'app-view-admin-nc',
  templateUrl: './view-admin-nc.component.html',
  styleUrls: ['./view-admin-nc.component.css']
})
export class ViewAdminNCComponent implements OnInit {

  myModel:any;
  pendingOrSubmitted:any;
  ncs:NC[]=[];

  constructor(private ncService:NcService,private firService:FirService
    ,private authService:LoginAuthService,private toastr:ToastrService,private router:Router) { 
    this.authService.isLoggedIn();
  }

  ngOnInit() {
    this.showAllNCs();
    this.firService.adminMessage$.subscribe((message)=>{
      if(message=="NC Submitted")
        this.showAllNCs();
    })
  }
  showAllNCs() {
    this.ncService.findAllNCsByPoliceStation().subscribe((response)=>{
      console.log("NCs inside admin");
      this.ncs=response;
      console.log(response);
    })
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
    this.ncService.changeStatusOfNC(id).subscribe((response)=>{
      console.log(response)
      this.firService.sendMessage(response.message);
    });
    console.log(id);
  }

  viewNC(id:any){
    this.router.navigate(['nc/view',id]);
  }
}
