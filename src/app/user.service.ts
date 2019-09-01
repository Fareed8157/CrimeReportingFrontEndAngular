import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl='http://localhost:8080';
  constructor(private http:HttpClient) {
    this.http=http;
   }

   saveUser(user:any): Observable<any>{
      const headers=new HttpHeaders({'Access-Control-Allow-Origin':'*'});
      return this.http.post(this.baseUrl+'/registration',user,{headers:headers});
   }

   loginUser(user:any): Observable<any>{
    const headers=new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    return this.http.post(this.baseUrl+'/login',user,{headers:headers});
 }


  roleMatch(allowedRole):boolean{
    var userRole;
    var isMatch=false;
    var currentUser=JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser!=null)
        userRole=currentUser.user.role;
    console.log(userRole);
    if(userRole==allowedRole){
      isMatch=true;
      return true;
    }
    return isMatch;
  }

 checkDuplicateNo(no:any){
   return this.http.get(this.baseUrl+"/findUserByNo/"+no);
 }

 checkDuplicateNIC(nic:any){
    return this.http.get(this.baseUrl+"/findUserByNic/"+nic);
  }

  checkDuplicateEmail(email:any){
    return this.http.get(this.baseUrl+"/findUserByEmail/"+email);
  }

  sendOTP(no:any):Observable<any>{
    return this.http.post(this.baseUrl+"/users/mobilenumbers/"+no+"/2fa",no);
  }

  verifyTwoFa(code:any,no:any){
    return this.http.put(this.baseUrl+"/users/"+no+"/"+code,JSON.stringify(no),code);
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
