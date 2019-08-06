import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SliderService } from '../services/slider.service';
import { Criminal } from '../models/criminal.model';
import { CriminalService } from '../services/criminal.service';
import { Fir } from 'src/app/client/models/fir.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-criminal',
  templateUrl: './criminal.component.html',
  styleUrls: ['./criminal.component.css']
})
export class CriminalComponent implements OnInit {

  public title:any;
  criminalForm:FormGroup;
  public criminal:Criminal;
  imgUrl:any;
  public criminalFiles:any=[];
  allImages: any[] = [];
  public imagesName:any=[];
  public images: any[] = [];
  public formData=new FormData();
  public removeImages:any=[];
  public fir:Fir[]=[];
  increment:any=0;
  public selectedFir:Fir;
  // dropdown data

  disabled=false;
  ShowFilter=false;
  limitSelection=false;
  firs:any=[];
  selectedItems:any=[];
  dropdownSettings:any={};

  

  formErrors = {

  };
  //This object contains all the validation messages for this form
  validationMessages = {
    'firstName': {
      'required': 'First Name is required.'
    },
    'lastName': {
      'required': 'Last Name is required.'
    },
    'nic': {
      'required': 'NIC is required.',
      'maxlength': 'NIC should not be greater than 13 characters.',
      'minlength': 'NIC must be at least 13 characters.'
    },
    'description': {
      'required': 'Description is required.'
    },
    'file': {
      'required': 'File is required.'
    },
    'fir': {
      'required': 'Fir No is required.'
    }
  };

  constructor(private fb: FormBuilder,private criminalService:CriminalService,private router:Router
    ,private route:ActivatedRoute) { }


  ngOnInit() {
    // this.firs = [
    //   { id: 1},
    //   { id: 2},
    //   { id: 3},
    //   { id: 4},
    //   { id: 5}
    // ];
    
    //   this.dropdownSettings = {
    //       singleSelection: false,
    //   idField: 'id',
    //   textField: 'id',
    //   unSelectAllText: 'UnSelect All',
    //   itemsShowLimit: 3,
    //   allowSearchFilter: true
    //     };
    this.criminalForm=this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      nic:['',[Validators.required,Validators.maxLength(13),Validators.minLength(13)]],
      description:['',Validators.required],
      file:['']
    });

    this.criminalForm.valueChanges.subscribe((data)=>{
      this.logValidationError(this.criminalForm);
    })

    this.route.paramMap.subscribe((params)=>{
      const criminalId=+params.get('id');
      if(criminalId){
        this.title="Edit Criminal";
        console.log(criminalId);
        this.getCriminalById(criminalId);
      }else{
        this.title="Create Criminal";
        this.criminal={
          id:null,
          firstName:'',
          lastName:'',
          nic:'',
          description:'',
          image:'',
          removeImages:''
        }
      }
    });
  }
  getCriminalById(criminalId: number) {
    this.criminal=new Criminal();
    this.criminalService.getCriminalById(criminalId).subscribe((response)=>{
      console.log(response);
      this.criminal=response.criminal;
      this.imagesName=response.fileName;
      this.images=response.images;
      this.editCriminalById(this.criminal);
    });
  }
  editCriminalById(criminal: Criminal) {
    this.criminalForm.patchValue({
      firstName:criminal.firstName,
      lastName:criminal.lastName,
      nic:criminal.nic,
      description:criminal.description,
    });
  }

  logValidationError(group: FormGroup=this.criminalForm): void {
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
    });
  }

  onSelectFile(event){
    const files=event.target.files;
    this.criminalFiles=files;
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
    console.log(this.removeImages);
  }

  findName(image:any){
    var index=-1;
    for (let i = 0; i < this.images.length; i++) {
     if(image===this.images[i]){
       return i;
     }
     
    }
  }
  onSubmit(){
    if(this.criminal.id){
      this.criminal.removeImages=this.removeImages;
      this.formData.append("criminal",JSON.stringify(this.criminal));
      console.log("is removeImages");
      console.log(this.criminal);
      this.criminalService.updateCriminal(this.formData).subscribe((response)=>{
      console.log(response);
    });
    }
    else{

    this.mappingValues();
    this.formData.append("criminal",JSON.stringify(this.criminal));
    this.criminalService.saveCriminal(this.formData).subscribe((response)=>{
      console.log(response);
    });
    }
    this.router.navigate(['admin/criminal/viewCriminal']);
    this.criminalForm.reset();
  }

  mappingValues(){
    this.criminal=new Criminal();
    this.criminal.firstName=this.criminalForm.value.firstName;
    this.criminal.lastName=this.criminalForm.value.lastName;
    this.criminal.description=this.criminalForm.value.description;
    this.criminal.nic=this.criminalForm.value.nic;
  }

  // onItemSelect(item:any){
  //   this.selectedFir=new Fir();
  //   this.selectedFir.id=item;
  //   this.fir.push(this.selectedFir);
  //   console.log(item);
  // }
  // onSelectAll(items:any){
  //   console.log(items);
  // }
}
