import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FirService } from '../services/fir.service';
import { CrimeTypes } from '../models/CrimeTypes.model';
import { PoliceStation } from '../models/PoliceStation.model';

@Component({
  selector: 'app-fir',
  templateUrl: './fir.component.html',
  styleUrls: ['./fir.component.css']
})
export class FirComponent implements OnInit {

  public crimes:CrimeTypes[]=[];
  public policeStatons:PoliceStation[]=[];
  public choosenCrime:CrimeTypes;
  public choosenPoliceStation:PoliceStation;
  public crime:CrimeTypes;
  firForm:FormGroup;
  constructor(private fb:FormBuilder,private firService:FirService) { }

  ngOnInit() {
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
      dateOfCrime:[''],
      crime:[],
      policeStation:[''],
      files:[''],
      description:['']
    });
    this.firForm.valueChanges.subscribe(
      value => {
        console.log(value);
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
  }
}
