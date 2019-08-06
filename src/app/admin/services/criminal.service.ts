import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CriminalService {

  baseUrl='http://localhost:8080';

  public _refreshNeeded$=new Subject<void>();

  getRefreshNeeded$(){
    return this._refreshNeeded$;
  }
  constructor(private http:HttpClient) {
    this.http=http;
   }

   saveCriminal(formData:FormData):Observable<any>{
    return this.http.post(this.baseUrl+'/criminal',formData)
    .pipe(
      tap(()=>{
        this._refreshNeeded$.next();
      })
    );
  }

  updateCriminal(formData:FormData):Observable<any>{
    return this.http.post(this.baseUrl+'/criminal',formData)
    .pipe(
      tap(()=>{
        this._refreshNeeded$.next();
      })
    );
  }
  getCriminals():Observable<any>{
    return this.http.get(this.baseUrl+'/criminal');
  }

  getCriminalById(id:any):Observable<any>{
    return this.http.get(this.baseUrl+'/editCriminal/'+id);
  }
}
