import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirService } from '../services/fir.service';
import { CrimeTypes } from '../models/CrimeTypes.model';
import { PoliceStation } from '../models/PoliceStation.model';
import { Fir } from '../models/fir.model';
import { SliderService } from 'src/app/admin/services/slider.service';
import { LoginAuthService } from 'src/app/login-auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fir',
  templateUrl: './fir.component.html',
  styleUrls: ['./fir.component.css']
})
export class FirComponent implements OnInit {

  pendingOrSubmitted:any;
  public crimes:CrimeTypes[]=[];
  public policeStatons:PoliceStation[]=[];
  public choosenCrime:CrimeTypes;
  public fir:Fir;
  public choosenPoliceStation:PoliceStation;
  public crime:CrimeTypes;
  public formData=new FormData();
  firForm:FormGroup;
  public eventOfFile:any; 
  increment:any=0;
  public sindhi:any;
  public crimeTypesFir:CrimeTypes[]=[];
  languageResponse:any;
  userFirs:Fir[]=[];
  flagForValidation:boolean;
   // dropdown data
  
   disabled=false;
   ShowFilter=false;
   limitSelection=false;
   firCrimeTypes:any=[];
   languages:any=[];
   selectedItems:any=[];
   dropdownSettings:any={};
   dropdownSettingsLanguage:any={};
   
   
  formErrors = {

  };
  //This object contains all the validation messages for this form
  validationMessages = {
    'dateOfCrime': {
      'required': 'Date Of Crime is required.'
    },
    'description': {
      'required': 'Description is required.'
    },
    'crime': {
      'required': 'Crime is required.'
    },
    'policeStation': {
      'required': 'Police Station is required.'
    },
    'placeOfIncident':{
      'required': 'Place of Incident is required.'
    },
    'addressOfcomplainant':{
      'required': 'Address Of Complainant is required.'
    }
  };

  constructor(private fb:FormBuilder,private firService:FirService,private sliderService:SliderService
    ,private authService:LoginAuthService,private toastr:ToastrService,private router:Router)
   { 
    this.authService.isLoggedIn();
   }

  ngOnInit() {

    this.chooseLanguage('en');
    this.getFirCimes();
    this.getAllFirsByUser();
    
    this.firService.getAllFirsByUser();
    this.languages=[
      {id:1,name:"English"},
      {id:2,name:"Sindhi"}
    ];
    // this.firCrimeTypes = [
    //   { id: 1,name:"Murder"},
    //   { id: 2,name:"Rape"},
    //   { id: 3,name:"Steal"},
    //   { id: 4,name:"Bribe"},
    //   { id: 5,name:"Harrass"}
    // ];
    
      this.dropdownSettings = {
          singleSelection: false,
      idField: 'id',
      textField: 'name',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
        };
    this.fir=new Fir();
    this.choosenCrime=new CrimeTypes();
    this.choosenPoliceStation=new PoliceStation();
    

    
    this.firService.getPoliceStations().subscribe((response)=>{
      this.policeStatons=response;
      console.log("policeStations");
      console.log(this.policeStatons);
    });

    this.firForm=this.fb.group({
      dateOfCrime:['',Validators.required],
      policeStation:['',Validators.required],
      files:[''],
      description:['',Validators.required],
      placeOfIncident:['',Validators.required],
      addressOfcomplainant:['',Validators.required]
    });
    this.firForm.valueChanges.subscribe(
      value => {
        console.log(value);
      });

    this.firForm.valueChanges.subscribe((data)=>{
      this.logValidationError(this.firForm);
    })
      
  }
  getAllFirsByUser() {
    this.firService.getAllFirsByUser().subscribe((response)=>{
      console.log("USER FIRS");
      this.userFirs=response;
      console.log(this.userFirs);
    });
  }
  getFirCimes() {
    this.firService.getCrimeTypes().subscribe((response)=>{
      this.firCrimeTypes=response;
      console.log("crimes");
      console.log(this.crimes);
      console.log("firs");
      console.log(this.firCrimeTypes);
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
  chooseLanguage(lang:any) {
    this.firService.changeLanguage(lang).subscribe((response)=>{
      this.languageResponse=response;
      console.log("language");
      console.log(response);
    });  
  }

  logValidationError(group: FormGroup=this.firForm): void {
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
      
      // if (abstractControl instanceof FormArray) {
      //   for (const control of abstractControl.controls) {
      //     if (control instanceof FormGroup) {
      //       this.logValidationError(control);
      //     }
      //   }
      // }
    });
  }
  getCrimeIndex(e){
    
    for (let index = 0; index < this.crimes.length; index++) {
      if(e==this.crimes[index].id){
        this.choosenCrime.id=e;
        this.choosenCrime.name=this.crimes[index].name;
        break;
      }
    }
    console.log(this.choosenCrime);
    //this.fir.crimeType=this.choosenCrime;

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
    this.fir.policeStation=this.choosenPoliceStation;

  }

  onSubmit(){
    this.mappingValues();
    this.formData.append("policeStation",JSON.stringify(this.choosenPoliceStation));
    this.formData.append("crimeType",JSON.stringify(this.crimeTypesFir));

    
    console.log(this.formData.get('crimeType'));
    this.firService.saveFir(this.formData).subscribe((response)=>{
      console.log(response);
      this.toastr.success("Fir Submitted Successfully");
      this.getAllFirsByUser();
      this.firService.sendMessage("Fir Submitted");
    })
    console.log("Crimes");
    console.log(this.crimeTypesFir);
    
    this.firForm.reset();
    
    this.formData=new FormData();
    this.clearCrimeTypes();
    if(this.firCrimeTypes.length===0){
      this.flagForValidation=true;
    }else{
      this.flagForValidation=false;
    }
  }
  clearCrimeTypes() {
      this.crimeTypesFir.splice(0,this.crimeTypesFir.length);
  }
  mappingValues() {
    this.fir.description=this.firForm.value.description;
    this.fir.dateOfCrime=this.firForm.value.dateOfCrime;
    this.fir.placeOfIncident=this.firForm.value.placeOfIncident;
    this.fir.addressOfcomplainant=this.firForm.value.addressOfcomplainant;
    this.formData.append("fir",JSON.stringify(this.fir));
  }

  onSelectFile(event){
    const files=event.target.files;
    for (let index = 0; index < files.length; index++) {
        
      this.formData.append('file-'+this.increment,files[index]);
      console.log('file-'+this.increment,files[index]);
      // const image={
      //   name:'',
      //   type:'',
      //   size:'',
      //   url:''
      // };
      this.increment++;
      // image.name=files[index].name;
      // image.type=files[index].type;
      // image.size=files[index].size;
    }
  }

  resetFiles(){
    this.eventOfFile.srcElement.value=null;
    this.formData.append("file",'');
  }

  onItemSelect(item:any){
    // this.selectedFir=new Fir();
    // this.selectedFir.id=item;
    // this.fir.push(this.selectedFir);
    
    console.log(item);
    this.crimeTypesFir.push(item);
  }
  onSelectAll(items:any){
    console.log(items);
  }

  onDropdownClose(){
    console.log("Onclose called");
  }


  getLanguage(lang:any){
    if(lang==1)
      this.chooseLanguage('en');
    else
      this.chooseLanguage('sd');
  }

  viewFir(id:any){
    this.router.navigate(['fir/view',id]);
  }
}
