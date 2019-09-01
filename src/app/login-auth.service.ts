import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

  private subject=new Subject<any>();

  constructor() { }

  isLoggedIn(){
    if(localStorage.getItem('currentUser')){
      this.subject.next({status:true});
    }else{
      this.subject.next({status:false});
    }
  }

  clearStatus(){
    this.subject.next();
  }

  getStatus():Observable<any>{
    return this.subject.asObservable();
  }
}
