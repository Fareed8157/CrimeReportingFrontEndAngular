import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SliderService } from '../services/slider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('deleSliderDialog',{static: false}) deleSliderDialog: ElementRef;

  
  constructor(private sliderServbice:SliderService,private router:Router) { }

  ngOnInit() {
  }

  delSlider(){
    console.log("inside delete admin");
    this.deleSliderDialog.nativeElement.click();
    this.sliderServbice.sendMessage('deleted');
    console.log(this.deleSliderDialog.nativeElement.display);
  }


}
