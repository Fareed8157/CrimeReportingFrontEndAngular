import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirService } from '../services/fir.service';
import { CrimeTypes } from '../models/CrimeTypes.model';
import { PoliceStation } from '../models/PoliceStation.model';
import { Fir } from '../models/fir.model';
import { SliderService } from 'src/app/admin/services/slider.service';

@Component({
  selector: 'app-fir',
  templateUrl: './fir.component.html',
  styleUrls: ['./fir.component.css']
})
export class FirComponent implements OnInit {

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
      'required': 'PoliceStation is required.'
    }
  };

  constructor(private fb:FormBuilder,private firService:FirService,private sliderService:SliderService) { }

  ngOnInit() {
    this.fir=new Fir();
    this.choosenCrime=new CrimeTypes();
    this.choosenPoliceStation=new PoliceStation();
    

    this.firService.getCrimeTypes().subscribe((response)=>{
      this.crimes=response;
      console.log("crimes");
      console.log(this.crimes);
    });
    this.firService.getPoliceStations().subscribe((response)=>{
      this.policeStatons=response;
      console.log("policeStations");
      console.log(this.policeStatons);
    });

    this.firForm=this.fb.group({
      dateOfCrime:['',Validators.required],
      crime:['',Validators.required],
      policeStation:['',Validators.required],
      files:[''],
      description:['',Validators.required]
    });
    this.firForm.valueChanges.subscribe(
      value => {
        console.log(value);
      });

      this.firForm.valueChanges.subscribe((data)=>{
        this.logValidationError(this.firForm);
      })
      
  }

  logValidationError(group: FormGroup=this.firForm): void {
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
    this.fir.crimeType=this.choosenCrime;

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
    //console.log(this.formData.get('file-'+0));
    this.formData.append("crimeType",JSON.stringify(this.choosenCrime));
    // this.sliderService.saveSlider(this.formData).subscribe((response)=>{
    //   console.log(response);
    // });
    this.firService.saveFir(this.formData).subscribe((response)=>{
      console.log(response);
    })
    this.formData=new FormData();
    this.firForm.reset();
  }
  mappingValues() {
    this.fir.description=this.firForm.value.description;
    this.fir.dateOfCrime=this.firForm.value.dateOfCrime;
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

}
