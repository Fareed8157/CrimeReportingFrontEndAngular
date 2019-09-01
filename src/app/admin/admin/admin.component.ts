import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SliderService } from '../services/slider.service';
import { Router } from '@angular/router';
import { LoginAuthService } from 'src/app/login-auth.service';
import { FirService } from 'src/app/client/services/fir.service';
import { Fir } from 'src/app/client/models/fir.model';
import { NcService } from 'src/app/client/services/nc.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('deleSliderDialog',{static: false}) deleSliderDialog: ElementRef;

  noOfFirs:any=0;
  noOfNCs:any=0;
  userFirs:Fir[]=[];
  constructor(private ncService:NcService,private firService:FirService,private sliderServbice:SliderService,private router:Router,private authService:LoginAuthService) 
  { 
    this.authService.isLoggedIn();
    //this.loginuser=JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    // this.firService.getAllFirsByPoliceStation().subscribe((response)=>{
    //   console.log('All firs By PoliceStation');
    //   this.userFirs=response;
    //   //this.calculateNoOfPendingFirs();
    //   console.log(this.userFirs);
    // });
    this.calculateNoOfPendingFirs();
    this.calculateNoOfPendingNCs();
    this.firService.adminMessage$.subscribe((message)=>{
      if(message=="Changed Successfully")
        this.calculateNoOfPendingFirs();
      if(message=="NC Status Changed Successfully"){
        this.calculateNoOfPendingNCs();
      }
    })
  }
  calculateNoOfPendingNCs() {
    this.ncService.findNCsWithFalse().subscribe((response)=>{
      this.noOfNCs=response.message;
      console.log("No Of NCs with false");
      console.log(response.message);
    });
  }
  calculateNoOfPendingFirs() {
    this.firService.findFirsWithFalse().subscribe((response)=>{
      console.log(response.message);
      this.noOfFirs=response.message;
    });
  }

  delSlider(){
    console.log("inside delete admin");
    this.deleSliderDialog.nativeElement.click();
    this.sliderServbice.sendMessage('deleted');
    console.log(this.deleSliderDialog.nativeElement.display);
  }


}
