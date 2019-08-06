import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { Slider } from '../models/Slider';
import { ListOfEvents } from '../models/ListOfEvents';
import { SliderService } from '../services/slider.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  sliderForm:FormGroup;
  public stringSlider:any;
  imgUrl:any;
  isDeleteSlider:boolean;
  public slider:Slider;
  public sliderFiles:any=[];
  allImages: any[] = [];
  public imagesName:any=[];
  public images: any[] = [];
  public formData=new FormData();
  public listOfEvents:ListOfEvents[]=[];
  public removeImages:any=[];
  public events:any=[];
  delEvent:any;
  increment:any=0;


  @ViewChild('myDiv',{static: false}) deltSliderButton: ElementRef;
  // This object will hold the messages to be displayed to the user
  // Notice, each key in this object has the same name as the
  // corresponding form control
  formErrors = {

  };
  //This object contains all the validation messages for this form
  validationMessages = {
    'title': {
      'required': 'Title is required.'
    },
    'description': {
      'required': 'Description is required.'
    },
    'file': {
      'required': 'File is required.'
    }
  };

  constructor(private fb: FormBuilder,private sliderService:SliderService) { }

  ngOnInit() {
    this.slider=new Slider();
    this.sliderService.adminMessage$.subscribe(
      (message)=>{
        if(message==='deleted'){
          this.isDeleteSlider=true;
          this.deleteEventByEvent(this.delEvent);
        }
      });
    this.getAllSliders();
    this.slider=new Slider();
    this.sliderForm=this.fb.group({
      title:['',Validators.required],
      description:['',Validators.required],
      file:['']
    });

    this.sliderForm.get('title').valueChanges.subscribe(
      value => {
        console.log(value);
      });
      this.sliderForm.valueChanges.subscribe((data)=>{
        this.logValidationError(this.sliderForm);
      })
  }

  getAllSliders(){
    this.sliderService.getImagesForSlider().subscribe((response)=>{
      console.log('Inside onInit');
      console.log(response);
      this.listOfEvents=response.listOfEvents;
      this.slider=response.listOfEvents.slider;
      this.imagesName=response.listOfEvents.fileName;
      console.log(this.imagesName);
      console.log('slider value')
      console.log(this.slider);
      for (let index = 0; index < this.listOfEvents.length; index++) {
        console.log(index);
        console.log(this.listOfEvents[index].slider)
        for (let i = 0; i < this.listOfEvents[index].images.length; i++) {
          console.log(this.listOfEvents[index].images[i]);
        }
      }
    });
  }

  logValidationError(group: FormGroup=this.sliderForm): void {
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

  onSelectFile(event){
    const files=event.target.files;
    this.sliderFiles=files;
    if(files){
      
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
        this.allImages.push(files[index]);
        // image.name=files[index].name;
        // image.type=files[index].type;
        // image.size=files[index].size;
        const reader=new FileReader();
        
        reader.onload=(fileData)=>{
          this.imgUrl=reader.result+'';
          console.log(this.images);
          console.log(this.imgUrl);
          this.images.push(this.imgUrl);
        };
        reader.readAsDataURL(files[index]);
      }
    }
    event.srcElement.value=null;
  }

  deleteImage(image:any,event,index:any){
    console.log(index);
    document.getElementById(index).hidden=true;
    //this.removeImages.push(this.imagesName[this.findName(image)]);
    var indexOfImage=this.findName(image);
    var nameOfImage=this.imagesName[indexOfImage];
    this.removeImages.push(nameOfImage);
    //this.removeImages+=nameOfImage+",";
    console.log(this.slider);
  }

  findName(image:any){
    var index=-1;
    for (let i = 0; i < this.images.length; i++) {
     if(image===this.images[i]){
       return i;
     }
     
    }
  }

  onSubmit():void{
    
    
    
    if(this.slider){
      if(this.slider.id){
        this.mapFormValues();
        this.formData.append('slider',JSON.stringify(this.slider));
        this.sliderService.updateSlider(this.formData).subscribe((response)=>{
          console.log(response);
          this.sliderForm.reset();
          this.images=[];
          console.log("if called");
          this.getAllSliders();
        },(err:any)=>console.log(err));
        this.formData=new FormData();
      }
    }
    else{
      this.slider=new Slider();
      this.mapFormValues();
      console.log("Inside map onSubmit else");
      console.log(this.formData.get('slider'));
      this.formData.append('slider',JSON.stringify(this.slider));
      console.log("after formdata");
      console.log(this.slider);
      this.sliderService.saveSlider(this.formData).subscribe((response)=>{
        console.log(response);
        this.stringSlider=this.slider;
        this.sliderForm.reset();
        this.images=[];
        this.getAllSliders();
      },(err)=>{
        console.log(err);
      });
      this.formData=new FormData();
    }  
  }
  mapFormValues(){
    this.slider.title=this.sliderForm.value.title;
    this.slider.description=this.sliderForm.value.description;
    this.slider.removeImages=this.removeImages;
    console.log("Inside map values");
    console.log(this.slider);
  }

  
  deleteClickButton(event:any){
    this.delEvent=event;
    console.log("delete button called");
    //delSliderDialog.modal('show');
    //confirm("Press a button!");
  }

  deleteEventByEvent(event:any){
    this.sliderService.deleteEvent(event.slider.id).subscribe((response)=>{
      console.log(response.message);
      let indexOfSlider=this.listOfEvents.indexOf(event);
      this.listOfEvents.splice(indexOfSlider,1);
    });
  }
  delSlider(){
    console.log("inside delete called");
  }

  editClickButton(slider:Slider){
    this.slider=slider;
    if(this.slider.id){
      this.sliderService.findEventById(this.slider.id).subscribe((response)=>{
        console.log('Inside onInit');
        console.log(response);
        this.slider=response.slider;
        this.imagesName=response.fileName;
        this.images=response.images;
        // this.imagesName=response.fileName;
        // console.log('slider value')
        
        // for (let index = 0; index < this.listOfEvents.length; index++) {
        //   console.log(index);
        //   console.log(this.listOfEvents[index].slider)
        //   this.slider=this.listOfEvents[index].slider[index];
        //   console.log(this.slider);
        //   this.images=this.listOfEvents[index].images;
        //   for (let i = 0; i < this.listOfEvents[index].images.length; i++) {
        //     console.log(this.listOfEvents[index].images[i]);
        //   }
        // }
      });
    }
    this.sliderForm.patchValue({
      title:this.slider.title,
      description:this.slider.description
    });
  }
}
