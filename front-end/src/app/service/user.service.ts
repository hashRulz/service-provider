import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {AppConstants} from "../configuration/AppConstant";

class User{

}

@Injectable({
  providedIn: 'root'
})
export class UserService {




  @Input('header')  header! : HttpHeaders;

  user: User = new User();
  private baseUrl = AppConstants.baseURL+"/api/v1"

  constructor(private httpClient : HttpClient) { }

  getUserRole(name: any):Observable<any>{

return this.httpClient.get(`${this.baseUrl}/getRoles/${name}`)

  }

  getAllUsers(): Observable<any>{
    const headers = new HttpHeaders({Authorization : 'Basic '+sessionStorage.getItem('btoa')})
    return this.httpClient.get(`${this.baseUrl}/getUsers`,{headers});
  }

  saveUser(user:User,roles:string):Observable<any>{
    console.log(sessionStorage.getItem('btoa'))
    const headers = new HttpHeaders({Authorization : 'Basic '+sessionStorage.getItem('btoa')})
    return this.httpClient.post(`${this.baseUrl}/user/save/${roles}`,user,{headers})
  }

  getUserNameByFullName(name:string):Observable<any>{


    return this.httpClient.get(`${this.baseUrl}/getUsersByUserName/${name}`)
  }

  // getUserByNickname(arg0: string):Observable<any> {
  //   return this.httpClient.get(`${this.baseUrl}/getUser/${arg0}`)
  // }

  getLoggedInUser(username:any):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/getLoggedUser/${username}`)
  }


}
