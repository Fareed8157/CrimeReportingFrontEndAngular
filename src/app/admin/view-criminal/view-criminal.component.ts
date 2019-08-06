import { Component, OnInit } from '@angular/core';
import { CriminalService } from '../services/criminal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-criminal',
  templateUrl: './view-criminal.component.html',
  styleUrls: ['./view-criminal.component.css']
})
export class ViewCriminalComponent implements OnInit {

  public criminals:any;

  constructor(private criminalService:CriminalService,private router:Router) { }

  ngOnInit() {
    this.criminalService._refreshNeeded$.subscribe(()=>{
      this.getAllCriminlas();
    })
    this.getAllCriminlas();
  }

  getAllCriminlas(){
    this.criminalService.getCriminals().subscribe((response)=>{
      console.log(response);
      this.criminals=response.listOfCriminals;
    });
  }

  editCriminal(id:any){
    this.router.navigate(['admin/criminal/edit',id]);
  }
}
