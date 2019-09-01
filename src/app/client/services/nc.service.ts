import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NCType } from '../models/nctype.model';
import { catchError } from 'rxjs/operators';
import { NC } from '../models/nc.model';

@Injectable({
  providedIn: 'root'
})
export class NcService {

  public loginuser:any={};
  public headers:HttpHeaders;

  baseUrl="http://localhost:8080/";
  constructor(private http:HttpClient) {
    this.http=http;
   }
   
   getNCTypes():Observable<NCType[]>{
    return this.http.get<NCType[]>(this.baseUrl+"nctype")
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

  saveNC(nc:NC):Observable<any>{
    this.loginuser=JSON.parse(localStorage.getItem('currentUser'));
    this.headers=new HttpHeaders({'Authorization':'Bearer '+this.loginuser.token});
    return this.http.post(this.baseUrl+"nc",nc,{headers:this.headers})
    .pipe(catchError(this.handleErroor));
  }

  findAllNCs():Observable<any>{
    this.loginuser=JSON.parse(localStorage.getItem('currentUser'));
    this.headers=new HttpHeaders({'Authorization':'Bearer '+this.loginuser.token});
    return this.http.get(this.baseUrl+"nc",{headers:this.headers})
    .pipe(catchError(this.handleErroor));
  }

  findNCById(id:any):Observable<any>{
    this.loginuser=JSON.parse(localStorage.getItem('currentUser'));
    this.headers=new HttpHeaders({'Authorization':'Bearer '+this.loginuser.token});
    return this.http.get(this.baseUrl+"nc/"+id,{headers:this.headers})
    .pipe(catchError(this.handleErroor));
  }

  findNCsWithFalse():Observable<any>{
    this.loginuser=JSON.parse(localStorage.getItem('currentUser'));
    this.headers=new HttpHeaders({'Authorization':'Bearer '+this.loginuser.token});
    return this.http.get(this.baseUrl+'statusOfNC',{headers:this.headers});
  }

  findAllNCsByPoliceStation():Observable<any>{
    this.loginuser=JSON.parse(localStorage.getItem('currentUser'));
    this.headers=new HttpHeaders({'Authorization':'Bearer '+this.loginuser.token});
    return this.http.get(this.baseUrl+'allNCsByAdmin',{headers:this.headers});
  }

  changeStatusOfNC(id):Observable<any>{
    this.loginuser=JSON.parse(localStorage.getItem('currentUser'));
    this.headers=new HttpHeaders({'Authorization':'Bearer '+this.loginuser.token});
    console.log(this.loginuser.token);
    return this.http.get(this.baseUrl+'ncByNCNoStatus/'+id,{headers:this.headers});
  }

  downloadNCCopy(id):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'image/jpeg',
        responseType : 'blob',
        Accept : 'image/jpeg',
        observe : 'response'
      })
    };
    return this.http.get(this.baseUrl+"ncPDF/"+id,{ responseType: 'arraybuffer' });
  }
}
