import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FirService } from '../client/services/fir.service';
import { PoliceStation } from '../client/models/PoliceStation.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from '../shared/custom.validator';
import { Router } from '@angular/router';
import { LoginAuthService } from '../login-auth.service';
import { LoginRequest } from '../models/loginRequest.model';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public choosenPoliceStation:PoliceStation;
  public userToLogin:LoginRequest;
  public cities:PoliceStation[]=[];
  public signUpForm:FormGroup;
  public loginForm:FormGroup;
  public twoFaVer:FormGroup;
  public user:User;
  public no:any;
  public errorMessage:any;
  public isSuccessOrFail=false;

  public cityOrPoliceStation:any;
  public cardTitle:any;

  @ViewChild('myToast',{static: false}) deleSliderDialog: ElementRef;

  isTechical=false;
  isExist=false;
  isNICExist=false;
  isEmailExist=false;
  public chosenCity:PoliceStation;
  constructor(private toastrService:ToastrService,private firService:FirService,private fb:FormBuilder,private userService:UserService
    ,private toastr:ToastrService,private router:Router,private authService:LoginAuthService) {
      this.authService.isLoggedIn();
     }

  formErrors = {

  };
  //This object contains all the validation messages for this form
  validationMessages = {
    'firstName': {
      'required': 'First Name is required.',
      'pattern':'Enter Characters only'
    },
    'lastName': {
      'required': 'Last Name is required.',
      'pattern':'Enter Characters only'
    },
    'fatherName': {
      'required': 'Father Name is required.',
      'pattern':'Enter Characters only'
    },
    'email': {
      'required': 'Email is required.',
      'emailDomain': 'Email should be valid',
      'email':'Email Should be Valid'
    },
    'password': {
      'required': 'Password is required.'
    },
    'nic': {
      'required': 'NIC is required.',
      'minlength':'Minimum Characters must be 13',
      'maxlength':'Maximum Characters must be 13',
      'pattern':'Enter digits only'
    },
    'address': {
      'required': 'Address is required.'
    },
    'phone': {
      'required': 'Phone Number is required.',
      'phoneDomain':'Phone Number must be valid',
      'minlength':'Minimum Characters must be 13',
      'maxlength':'Maximum Characters must be 13',
      'pattern':'Must contain digits only'
    },
    'emailOrPhone': {
      'required': 'Phone Number is required.'
    },
    'cities': {
      'required': 'Phone Number is required.'
    },
    'roles': {
      'required': 'Role is required.'
    }
    
  };
  ngOnInit() {
    this.user=new User();
    this.choosenPoliceStation=new PoliceStation();
    this.firService.getPoliceStations().subscribe((response)=>{
      this.cities=response;
      console.log("policeStations");
      console.log(this.cities);
    });
    this.cardTitle="Registration";
    this.cityOrPoliceStation="City";
    document.getElementById("twoFaAlertSuccess").hidden=true;
    document.getElementById("twoFaAlertDanger").hidden=true;
    this.loginForm=this.fb.group({
      emailOrPhone:['',Validators.required],
      password:['',Validators.required]
    });
    this.signUpForm=this.fb.group({
      firstName:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      lastName:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      fatherName:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
      phone:['',[Validators.required,CustomValidators.phoneDomain('+92'),Validators.pattern('[+0-9]*'),Validators.minLength(13),Validators.maxLength(13)]],
      nic:['',[Validators.minLength(13),Validators.maxLength(13),Validators.pattern('[0-9]*')]],
      address:['',[Validators.required]],
      cities:['',Validators.required],
      roles:['',Validators.required]
    });

    this.twoFaVer=this.fb.group({
      twoFa:['',Validators.required]
    });
    this.twoFaVer.valueChanges.subscribe(
      value => {
        console.log(value);
      });
    this.signUpForm.valueChanges.subscribe(
      value => {
        console.log(value);
      });
      this.loginForm.valueChanges.subscribe((data)=>{
        this.logValidationErrorLogin(this.loginForm);
      })
    this.signUpForm.valueChanges.subscribe((data)=>{
      this.logValidationError(this.signUpForm);
    })
  }

  logValidationError(group: FormGroup=this.signUpForm): void {
    console.log("loginValidation called");
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key]='';
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty
          || abstractControl.value!='')) {
          const messages = this.validationMessages[key];
          console.log(messages);
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

  logValidationErrorLogin(group: FormGroup=this.loginForm): void {
    console.log("loginValidation called");
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key]='';
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty
          || abstractControl.value!='')) {
          const messages = this.validationMessages[key];
          console.log(messages);
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
  getCityIndex(e){
    this.chosenCity=new PoliceStation();
    for (let index = 0; index < this.cities.length; index++) {
      if(e==this.cities[index].id){
        this.chosenCity.name=this.cities[index].name;
        this.choosenPoliceStation.id=e;
        this.choosenPoliceStation.name=this.chosenCity.name;
        break;
      }
    }
    console.log(this.chosenCity);
    this.user.city=this.chosenCity.name;
    console.log(e);
  }

  onSubmit(){
    this.mappingValues();
    this.user.enabled=true;
    if(this.userService.roleMatch('TECHNICAL')){
      this.user.policeStation=this.choosenPoliceStation;
    }
    this.userService.saveUser(this.user).subscribe((response)=>{
      if(response){
        console.log(response);
        this.toastr.success("User Registered Successfully");
        this.signUpForm.reset();
      }
    });
    console.log(this.user);
  }
  mappingValues() {
    this.user.firstName=this.signUpForm.value.firstName;
    this.user.lastName=this.signUpForm.value.lastName;
    this.user.fatherName=this.signUpForm.value.fatherName;
    this.user.address=this.signUpForm.value.address;
    this.user.email=this.signUpForm.value.email;
    this.user.password=this.signUpForm.value.password;
    this.user.nic=this.signUpForm.value.nic;
    this.user.phoneNumber=this.signUpForm.value.phone;
  }

  checkDuplicate(e){
    this.no=e;
    this.userService.checkDuplicateNo(e).subscribe((response)=>{
        if(response==false){
          console.log(response);
          this.isExist=false;
          console.log(this.signUpForm.get('phone').invalid && this.signUpForm.get('phone').touched);
          if(!this.signUpForm.get('phone').invalid && this.signUpForm.get('phone').touched){
            document.getElementById("openModalButton").click();
          }
          this.sendOTP(e);
        }else{
          this.isExist=true;
        }
    });
    console.log(e);
  }
  sendOTP(e) {
    this.userService.sendOTP(e).subscribe((response)=>{
      console.log(response);
    });

  }

  checkDuplicatNic(e){
    this.userService.checkDuplicateNIC(e).subscribe((response)=>{
      if(response==false){
        console.log(response);
        this.isNICExist=false;
      }else{
        this.isNICExist=true;
      }
    })
    console.log(e);
  }

  checkDuplicatEmail(e){
    this.userService.checkDuplicateEmail(e).subscribe((response)=>{
      if(response==false){
        console.log(response);
        this.isEmailExist=false;
      }else{
        this.isEmailExist=true;
      }
    });
    console.log(e);
  }

  verifyTwoFa(){
    this.userService.verifyTwoFa(this.twoFaVer.value.twoFa,this.no).subscribe(res=>{
      console.log(res);
      this.errorMessage="Verified Successfully"; 
      document.getElementById("twoFaAlertSuccess").hidden=false;
      this.twoFaVer.reset();
    },err=>{
      console.log(err);
      this.errorMessage=err.error.message;
      document.getElementById("twoFaAlertDanger").hidden=false;
    });
  }

  resendCode(){
    this.sendOTP(this.no);
  }
  
  onLogin(){
    this.userToLogin=new LoginRequest();
    this.mappingLoginValues();
    //this.user.enabled=true;
    this.userService.loginUser(this.userToLogin).subscribe((response)=>{
      if(response){
        if(response.token){
          localStorage.setItem('currentUser',JSON.stringify(response));
          if(response.user.role==='ADMIN'){
            this.router.navigate(['/admin']);
          }else if(response.user.role==='TECHNICAL'){
            this.cityOrPoliceStation="Police Station";
            this.cardTitle="Employee Registration";
            this.router.navigate(['/addEmployee'])
            
          }
          else{
            this.router.navigate(['/fir'])
          }
        }
        
      }
    }, (err:any)=>{
      console.log("Login Failed");
      console.log(err)
      this.toastr.error("Login Failed Please Enter Correct Credentials");

    });
  }
  mappingLoginValues() {
    this.userToLogin.emailOrPhoneNumber=this.loginForm.value.emailOrPhone;
    this.userToLogin.password=this.loginForm.value.password;
  }

  getIndex(index:any){
    console.log(index);
  }
  
}
