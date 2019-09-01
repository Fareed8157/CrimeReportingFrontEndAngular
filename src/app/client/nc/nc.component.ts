import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginAuthService } from 'src/app/login-auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, Route } from '@angular/router';
import { FirService } from '../services/fir.service';
import { NCType } from '../models/nctype.model';
import { NcService } from '../services/nc.service';
import { NC } from '../models/nc.model';
import { PoliceStation } from '../models/PoliceStation.model';

@Component({
  selector: 'app-nc',
  templateUrl: './nc.component.html',
  styleUrls: ['./nc.component.css']
})
export class NcComponent implements OnInit {

  constructor(private ncService:NcService,private fb:FormBuilder,
  private authService:LoginAuthService,private firService:FirService,private toastr:ToastrService,private router:Router) 
  { 
    this.authService.isLoggedIn();
  }

// variables
  ncForm:FormGroup;
  languageResponse:any;
  ncTypes:NCType[]=[];
  public choosenNCType:NCType;
  public nc:NC;
  public policeStatons:PoliceStation[]=[];
  public choosenPoliceStation:PoliceStation;
  ncs:NC[]=[];
  pendingOrSubmitted:any;




  formErrors = {

  };
  //This object contains all the validation messages for this form
  validationMessages = {
    'ncType': {
      'required': 'NC Type is required.'
    },
    'description': {
      'required': 'Description is required.'
    },
    'policeStation': {
      'required': 'Police Station is required.'
    },
    
  };
  ngOnInit() {
    this.findAllNCs();
    this.firService.getPoliceStations().subscribe((response)=>{
      this.policeStatons=response;
      console.log("policeStations");
      console.log(this.policeStatons);
    });
    this.findAllNCs();
    this.choosenPoliceStation=new PoliceStation();
    this.choosenNCType=new NCType();
    this.nc=new NC();
    this.chooseLanguage('en');
    this.ncService.getNCTypes().subscribe((response)=>{
      console.log("NC Types");
      console.log(response);
      this.ncTypes=response;
    });

    this.ncForm=this.fb.group({
      ncType:['',Validators.required],
      description:['',Validators.required],
      policeStation:['',Validators.required]
    });
    this.ncForm.valueChanges.subscribe((data)=>{
      this.logValidationError(this.ncForm);
    })
  }
  
  findAllNCs() {
    this.ncService.findAllNCs().subscribe((response)=>{
      console.log("NCs");
      this.ncs=response;
      console.log(response);
    })
  }

  chooseLanguage(lang:any) {
    this.firService.changeLanguage(lang).subscribe((response)=>{
      this.languageResponse=response;
      console.log("language");
      console.log(response);
    }); 
  }

  getColor(flag) { 
    console.log("flag called"+flag);
    switch (flag) {
      case true:
        {
          console.log("inside flag");
          this.pendingOrSubmitted="Submitted";
          return 'badge statusDivSuccess';
        }
      case false:
        {
          this.pendingOrSubmitted="Pending";
          console.log("inside flag");
          return 'badge statusDivPending';
        }
      
    }
  }

  logValidationError(group: FormGroup=this.ncForm): void {
    console.log("loginValidation called");
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key]='';
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty
          || abstractControl.value!='')) {
          const messages = this.validationMessages[key];
          for(const errorKey in abstractControl.errors){
            if(errorKey){
              this.formErrors[key]+=messages[errorKey]+' ';
            }
          }
        }
      if (abstractControl instanceof FormGroup) {
        this.logValidationError(abstractControl);
      } 
    });
  }

  getPoliceStationIndex(e){
    for (let index = 0; index < this.policeStatons.length; index++) {
      if(e==this.policeStatons[index].id){
        this.choosenPoliceStation.id=e;
        this.choosenPoliceStation.name=this.policeStatons[index].name;
        break;
      }
    }
    console.log(this.choosenPoliceStation);
    this.nc.policeStation=this.choosenPoliceStation;

  }

  onSubmit(){
    this.mappingValues();
    this.ncService.saveNC(this.nc).subscribe((response)=>{
      console.log(response);
      this.ncForm.reset();
      this.toastr.success("NC Submitted Succesfully");
    })
  }

  mappingValues() {
    this.nc.description=this.ncForm.value.description;
  }


  getNCTypeIndex(e){
    console.log(e);
    for (let index = 0; index < this.ncTypes.length; index++) {
      if(e==this.ncTypes[index].id){
        this.choosenNCType.id=e;
        this.choosenNCType.name=this.ncTypes[index].name;
        break;
      }
    }
    console.log(this.choosenNCType);
    this.nc.ncType=this.choosenNCType;
    console.log(this.nc);
  }

  getLanguage(lang:any){
    if(lang==1)
      this.chooseLanguage('en');
    else
      this.chooseLanguage('sd');
  }
  
  viewNC(id:any){
    this.router.navigate(['/nc/view',id]);
  }
}
