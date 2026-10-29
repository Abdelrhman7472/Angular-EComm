import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { jwtDecode } from "jwt-decode";
import { User } from '../../Interfaces/user';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
 private httpClient:HttpClient=inject(HttpClient)

 userData= new BehaviorSubject(null);

 registerAPI(bodyData:object) : Observable<any>{
  return this.httpClient.post(`${environment.baseUrl}auth/signup`,bodyData)
 }
 loginAPI(bodyData:object):Observable<any>{
  return this.httpClient.post(`${environment.baseUrl}auth/signin`,bodyData)
 }

 setUserData(){



    this.userData.next(jwtDecode(localStorage.getItem('userToken')!));

    console.log(this.userData.getValue());


}


}
