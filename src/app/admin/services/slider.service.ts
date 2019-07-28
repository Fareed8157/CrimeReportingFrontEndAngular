import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SliderService {


  baseUrl='http://localhost:8080';
  constructor(private http:HttpClient) {
    this.http=http;
   }

  //  sending true or false for deleting sliderConfirmation

  private _delSliderOrNot=new Subject<string>();
  adminMessage$=this._delSliderOrNot.asObservable();

  sendMessage(message:string){
    this._delSliderOrNot.next(message);
  }

   saveUser(user:any): Observable<any>{
      const headers=new HttpHeaders({'Access-Control-Allow-Origin':'*'});
      return this.http.post(this.baseUrl+'/registration',user,{headers:headers});
   }

   loginUser(user:any): Observable<any>{
    const headers=new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    return this.http.post(this.baseUrl+'/login',user,{headers:headers});
 }

  getAllUsers(token:any):Observable<any>{
    const headers=new HttpHeaders({'Authorization':'Bearer '+token});
    return this.http.get(this.baseUrl+'/users',{headers:headers});
  }

  getUser(token:any):Observable<any>{
    const headers=new HttpHeaders({'Authorization':'Bearer '+token});
    return this.http.get(this.baseUrl+'/getuser',{headers:headers});
  }

  saveSlider(formData:FormData):Observable<any>{
    return this.http.post(this.baseUrl+'/slider',formData);
  }

  updateSlider(formData:FormData):Observable<any>{
    return this.http.put(this.baseUrl+'/slider',formData);
  }
  getImages():Observable<any>{
    return this.http.get(this.baseUrl+"/slider");
  }

  downloadImages(fileName:any):Observable<Blob>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'image/jpeg',
        responseType : 'blob',
        Accept : 'image/jpeg',
        observe : 'response'
      })
    };
    console.log(this.baseUrl+"/downloadfile/"+fileName);
    return this.http.get(this.baseUrl+"/download1/"+fileName,{ responseType: 'blob' });
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
    return this.http.get(this.baseUrl+"/download1/"+fileName,{ responseType: 'arraybuffer' });
  }

  getImagesForSlider():Observable<any>{
    return this.http.get(this.baseUrl+"/getImagesByEvent");
  }

  deleteEvent(id:number):Observable<any>{
    return this.http.delete(this.baseUrl+"/slider/"+id);
  }

  findEventById(id:number):Observable<any>{
    return this.http.get(this.baseUrl+'/editEvent/'+id);
  }
}
