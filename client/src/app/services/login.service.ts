import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public isLogin(): boolean {
    return localStorage.getItem("token") ? true : false;
  }
  public login(type: string, email: string, pasword: string): Observable<any> {
    return new Observable<any>((res) => {
      //todo
      localStorage.setItem("token", "blabls");
      localStorage.setItem("loginType", type);
      return res.next(true);
    })
  }
  public logOut(): Observable<any> {
    return new Observable<any>((res) => {
      //todo
      localStorage.removeItem("token");
      localStorage.removeItem("loginType");
      return res.next(true);
    })


  }




  constructor() { }



}
