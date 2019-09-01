import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { NcService } from '../services/nc.service';
import { NC } from '../models/nc.model';

@Component({
  selector: 'app-view-nc',
  templateUrl: './view-nc.component.html',
  styleUrls: ['./view-nc.component.css']
})
export class ViewNcComponent implements OnInit {

  nc:NC;
  constructor(private toaster:ToastrService,private route:ActivatedRoute,private ncService:NcService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params)=>{
      const ncId=+params.get('id');
      if(ncId){
        this.findNC(ncId);
      }
    })
  }
  findNC(ncId: number) {
    this.ncService.findNCById(ncId).subscribe((response)=>{
      console.log("Inside view nc")
      console.log(response);
      this.nc=response;
    });
  }

  downloadNCCopy(id:any){
    this.ncService.downloadNCCopy(id).subscribe((response)=>{
      console.log("Fir download called");
    });
  }
}
