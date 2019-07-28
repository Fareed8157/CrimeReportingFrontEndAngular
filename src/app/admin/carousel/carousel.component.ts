import { Component, OnInit } from '@angular/core';
import { SliderService } from '../services/slider.service';
import { ListOfEvents } from '../models/ListOfEvents';
import { Slider } from '../models/Slider';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  public listOfEvents:ListOfEvents[]=[];
  public images:Slider[]=[];
  public tempSlider:Slider[]=[];
  public title:any;
  public desc:any;
  public slider:Slider;
  public slider1:any;
  constructor(private sliderService:SliderService) { }

  ngOnInit() {
    
    this.sliderService.getImagesForSlider().subscribe((response)=>{
      console.log('Inside onInit');
      this.slider1=new Slider();
      console.log(response);
      this.listOfEvents=response.listOfEvents;
      console.log('slider value')
      for (let index = 0; index < this.listOfEvents.length; index++) {
        console.log(index);
        
        // console.log(this.slider1);
        // console.log(Object.values(this.slider1)[1][1]);
        // console.log(Object.values(this.slider1)[2][1]);
        // console.log(Object.keys(this.slider1)[0]);
        
          
        console.log(this.listOfEvents[index].images)
        this.tempSlider=this.listOfEvents[index].slider;
        console.log(this.listOfEvents[index].images.length);
        //console.log(this.listOfEvents[index].slider[0].title)
        for (let i = 0; i < this.listOfEvents[index].images.length; i++) {
          //console.log(this.listOfEvents[index].images[i]);
          this.slider1=Object.entries(this.listOfEvents[index].slider);
          this.slider1.title=Object.values(this.slider1)[1][1]
          this.slider1.description=Object.values(this.slider1)[2][1];
          this.slider1.image=this.listOfEvents[index].images[i];
          console.log("all images with titles"+this.slider1);
          console.log("all images with titles"+i);
          this.images.push(this.slider1);
          this.slider1=new Slider();
        }
        
        //console.log("all images with titles"+index);
      }
      console.log("all images with titles");
    console.log(this.images.length);
    });
    
  }

}
