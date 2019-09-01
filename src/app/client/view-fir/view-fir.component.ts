import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirService } from '../services/fir.service';
import { Fir } from '../models/fir.model';
import { CrimeTypes } from '../models/CrimeTypes.model';
import { PoliceStation } from '../models/PoliceStation.model';
import { User } from 'src/app/models/user.model';
import { FirFile } from '../models/firFile.model';

@Component({
  selector: 'app-view-fir',
  templateUrl: './view-fir.component.html',
  styleUrls: ['./view-fir.component.css']
})
export class ViewFirComponent implements OnInit {

  constructor(private route:ActivatedRoute,private firService:FirService) {
    
   }
  f:any;
  firFile:FirFile;
  languageResponse:any;
  fir:Fir;
  firOriginal:any;
  crimeType:CrimeTypes[]=[];
  policeStation:PoliceStation;
  fileName:any;
  user:User;
  ngOnInit() {
    
    this.policeStation=new PoliceStation();
    this.fir=new Fir();
    this.user=new User();
    this.firFile=new FirFile();
    //this.chooseLanguage('en');
    this.route.paramMap.subscribe(params=>{
      const firId = +params.get('id');
      if(firId){
        console.log(firId);
        this.findFirById(firId);
      }
    });
  }
  findFirById(firId: number) {
    this.firService.findFirByFirNo(firId).subscribe((response)=>{

      console.log("Fir By Fir No");
      this.firOriginal=response;
      
        this.fir=this.firOriginal.fir;
      this.policeStation=this.fir.policeStation;
      
        this.firFile.modifiedFileName=this.firOriginal.modifiedFileName;
        console.log("else called");
      this.crimeType=this.fir.crimeType;
      this.user=this.fir.user;
      console.log(this.fir);
      this.getCrimeTypeInSindhiOrEnglish();
      
      

    })
  }
  downloadProofs(fileName:any){
    this.f=JSON.stringify(this.firFile['modifiedFileName']);
    this.downloadFiles(this.firFile.modifiedFileName+",hello");
    console.log(this.firFile.modifiedFileName+"hello");
    console.log(this.firFile+',inside download');
    console.log(this.f);
  }

  downloadFirCopy(id:any){
    this.firService.downloadFirCopy(id).subscribe((response)=>{
      console.log("Fir download called");
    });
  }
  downloadFiles(name:any){
    //var index=this.findName(image);
    //console.log("index"+index);
   // console.log("Images names"+this.imagesName[index]);
    //console.log("download filename"+this.imagesName[0]);
    
    this.firService.downloadRarFiles(name).subscribe((x)=>{
      //var newBlob = new Blob([x], { type: "application/octet-stream" });
      //for rar file
      var newBlob = new Blob([x], { type: "application/octet-stream" });
      // for images
     // var newBlob = new Blob([x], { type: "image/jpeg" });
      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
      }

      // For other browsers: 
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(newBlob);

      var link = document.createElement('a');
      link.href = data;
      link.download = 'proofs';
      // this is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      setTimeout(function () {
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(data);
          link.remove();
      }, 100);
    })
  }
  chooseLanguage(lang:any) {
    this.firService.changeLanguage(lang).subscribe((response)=>{
      this.languageResponse=response;
      console.log("language");
      console.log(response);
    });  
  }
  getCrimeTypeInSindhiOrEnglish(){
    for (let index = 0; index < this.crimeType.length; index++) {
      let crimeType = this.crimeType[index];
      let splitName=crimeType.name.split(',');
      //this.crimeType[index].name=splitName[1];
      this.crimeType[index].name=crimeType.name;
      console.log(splitName[0]);
    }
    console.log("Fir In Sindhi");
    console.log(this.crimeType);
  }

}
