import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { PoliceStation } from '../models/PoliceStation.model';
import { HttpClient, HttpErrorResponse} from "@angular/common/http"
import {catchError} from "rxjs/operators"
import { CrimeTypes } from '../models/CrimeTypes.model';

@Injectable({
  providedIn: 'root'
})
export class FirService {

  baseUrl="http://localhost:8080/";
  constructor(private http:HttpClient) {
    this.http=http;
   }

  getCrimeTypes():Observable<CrimeTypes[]>{
    return this.http.get<CrimeTypes[]>(this.baseUrl+"crime")
    .pipe(catchError(this.handleErroor));
  }

  private handleErroor(errorResponse:HttpErrorResponse){
    if(errorResponse.error instanceof ErrorEvent){
      console.error("Client side error : ",errorResponse.error);
    }else{
      console.error("Server Side error",errorResponse);
    }
    return throwError('There is problem with Service');
  }

  getPoliceStations():Observable<PoliceStation[]>{
    return this.http.get<PoliceStation[]>(this.baseUrl+"policeStation")
    .pipe(catchError(this.handleErroor));
  }

  
}
