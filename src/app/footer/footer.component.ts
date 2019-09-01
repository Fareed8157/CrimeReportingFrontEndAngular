import { Component, OnInit } from '@angular/core';
import {chart} from 'chart.js';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  LineChart=[];

  constructor() { }

  ngOnInit() {
    this.LineChart=new chart('lineChart',{
      type:'line',
      data:{
        labels:["Jan","Feb","March","April","May","June","July","August","September","Oct","Nov","Dec"],
        datasets:[{
          label:"No of items sold in a month",
          data:[9,7,3,5,2,10,15,16,19,3,1,9],
          fill:false,
          lineTension:0.2,
          borderColor:"red",
          borderWidht:1,

        }]
      },
      options:{
        title:"Line Chart",
        display:true,

      },
      scalse:{
        yAxes:[{
          ticks:{
            beginAtZerp:true
          }
        }]
      }
    });
  }

}
