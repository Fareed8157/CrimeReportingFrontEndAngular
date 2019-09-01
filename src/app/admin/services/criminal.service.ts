import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CriminalService {

  baseUrl='http://localhost:8080';

  public loginuser:any={};

  public _refreshNeeded$=new Subject<void>();
  public headers:HttpHeaders;
  getRefreshNeeded$(){
    return this._refreshNeeded$;
  }
  constructor(private http:HttpClient) {
    this.http=http;
    this.loginuser=JSON.parse(localStorage.getItem('currentUser'));
    this.headers=new HttpHeaders({'Authorization':'Bearer '+this.loginuser.token});
    
   }

   saveCriminal(formData:FormData):Observable<any>{
    return this.http.post(this.baseUrl+'/criminal',formData,{headers:this.headers})
    .pipe(
      tap(()=>{
        this._refreshNeeded$.next();
      })
    );
  }

  updateCriminal(formData:FormData):Observable<any>{
    return this.http.post(this.baseUrl+'/criminal',formData,{headers:this.headers})
    .pipe(
      tap(()=>{
        this._refreshNeeded$.next();
      })
    );
  }
  getCriminals():Observable<any>{
    return this.http.get(this.baseUrl+'/criminal',{headers:this.headers});
  }

  getCriminalById(id:any):Observable<any>{
    return this.http.get(this.baseUrl+'/editCriminal/'+id,{headers:this.headers});
  }

  deleteCriminal(id:any):Observable<any>{
    return this.http.delete(this.baseUrl+'/criminal/'+id,{headers:this.headers});
  }
}
