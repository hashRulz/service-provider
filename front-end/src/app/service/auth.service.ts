import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouteConfigLoadEnd } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HomeComponent } from '../components/nav/home.component';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isUserLogged = false;
  header! : HttpHeaders;
  isLoginSubject = new BehaviorSubject<boolean>(false);
  
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
  USER_NAME_SESSION_ATTRIBUTE_ID = 'authenticatedUserId'
  public username: string="";
  public password: string="";

 
  private baseUrl = "http://localhost:8081/api/v1"

  constructor(private http: HttpClient,private userService:UserService) {

  }

  private hasToken() : boolean {
    return !!localStorage.getItem('authenticatedUser');
  }

  authenticationService(username: string, password: string) {
    
    const headers = new HttpHeaders({Authorization : 'Basic '+btoa(username + ":" + password)})
    console.log(username,password)
    sessionStorage.setItem('btoa',btoa(username + ":" + password))
    return this.http.get(`${this.baseUrl}/basicauth`,{headers}).pipe(map((res) => {
     this.username = username;
     this.password = password;
     this.userService.header = headers;
     this.registerSuccessfulLogin(username , password)
     this.isLoginSubject.next(true);
   }));
  }


  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin(username: string , password: string) {
   

   sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
    
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_ID);
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem('btoa')
    sessionStorage.removeItem('role')
    this.username = "";
    this.password = "";
    HomeComponent.prototype.updateUserLogout();
  }

  
  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    
    if (user === null) return false
    else{
      return true

    }
  }
  
  
  getLoggedInUserId(){
   let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_ID)
   if (user === null) return ''
   return user
   
  }
  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }
}
