import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { SignupObject, login } from './signup-object';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userTokenData: any



  

  isLogin = new BehaviorSubject(false)

  constructor(private _HttpClient: HttpClient, private _Router: Router) {





    if (localStorage.getItem('token') != null) {


      this.userTokenData = jwtDecode(localStorage.getItem('token')!)

      
     localStorage.setItem('userName', this.userTokenData['name'])


      this.isLogin.next(true)
    }

  }



  signUp(regInfo: SignupObject): Observable<any> {

    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', regInfo)


  }


  login(loginData: login) {

    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', loginData)

  }


  logOut() {
    this.isLogin.next(false)

    this._Router.navigate(['/login'])

    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    localStorage.removeItem('userId')

  }



  forgetPW(data:any):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',data)
  }



 
  verifyCode(data:any):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',data)
  }





  resetPassword(obj:object){

    return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
    obj)
    
  }
}




