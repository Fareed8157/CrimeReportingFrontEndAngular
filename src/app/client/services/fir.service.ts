import { Injectable } from '@angular/core';
import { Observable, from, throwError, Subject } from 'rxjs';
import { PoliceStation } from '../models/PoliceStation.model';
import { HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http"
import {catchError} from "rxjs/operators"
import { CrimeTypes } from '../models/CrimeTypes.model';
import { Fir } from '../models/fir.model';

@Injectable({
  providedIn: 'root'
})
export class FirService {

  public loginuser:any={};
  public headers:HttpHeaders;

  baseUrl="http://localhost:8080/";
  constructor(private http:HttpClient) {
    this.http=http;
   }

   private _isStatusChangedOrNot=new Subject<string>();
  adminMessage$=this._isStatusChangedOrNot.asObservable();

  sendMessage(message:string){
    this._isStatusChangedOrNot.next(message);
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


  saveFir(formData:FormData):Observable<any>{
    this.loginuser=JSON.parse(localStorage.getItem('currentUser'));
    this.headers=new HttpHeaders({'Authorization':'Bearer '+this.loginuser.token});
    return this.http.post(this.baseUrl+'fir',formData,{headers:this.headers});
  }
  

  getAllFirsByUser():Observable<any>{
    this.loginuser=JSON.parse(localStorage.getItem('currentUser'));
    this.headers=new HttpHeaders({'Authorization':'Bearer '+this.loginuser.token});
    return this.http.get(this.baseUrl+'allfirsByUser',{headers:this.headers});
  }

  findFirByFirNo(id:any):Observable<any>{
    this.loginuser=JSON.parse(localStorage.getItem('currentUser'));
    this.headers=new HttpHeaders({'Authorization':'Bearer '+this.loginuser.token});
    return this.http.get(this.baseUrl+'firByFirNo/'+id,{headers:this.headers});
  }

  findFirsWithFalse():Observable<any>{
    this.loginuser=JSON.parse(localStorage.getItem('currentUser'));
    this.headers=new HttpHeaders({'Authorization':'Bearer '+this.loginuser.token});
    return this.http.get(this.baseUrl+'statusOfFir',{headers:this.headers});
  }
  changeStatusOfFir(id:any):Observable<any>{
    this.loginuser=JSON.parse(localStorage.getItem('currentUser'));
    this.headers=new HttpHeaders({'Authorization':'Bearer '+this.loginuser.token});
    console.log(this.loginuser.token);
    return this.http.get(this.baseUrl+'firByFirNoStatus/'+id,{headers:this.headers});
  }
  downloadRarFiles(fileName:any):Observable<ArrayBuffer>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'image/jpeg',
        responseType : 'blob',
        Accept : 'image/jpeg',
        observe : 'response'
      })
    };
    console.log(this.baseUrl+"/downloadfile/"+fileName);
    return this.http.get(this.baseUrl+"downloadfile/"+fileName,{ responseType: 'arraybuffer' });
  }

  downloadFirCopy(id:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'image/jpeg',
        responseType : 'blob',
        Accept : 'image/jpeg',
        observe : 'response'
      })
    };
    return this.http.get(this.baseUrl+"firPDF/"+id,{ responseType: 'arraybuffer' });
  }
  
  getAllFirsByPoliceStation():Observable<any>{
    this.loginuser=JSON.parse(localStorage.getItem('currentUser'));
    this.headers=new HttpHeaders({'Authorization':'Bearer '+this.loginuser.token});
    return this.http.get(this.baseUrl+'firs',{headers:this.headers});
  }
  changeLanguage(lang:any):Observable<any>{
    const headers=new HttpHeaders({'Accept-Language':lang,responseType: 'text'});
    return this.http.get(this.baseUrl+"english",{headers:headers});
  }
}
