import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AppConstants} from "../configuration/AppConstant";

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient : HttpClient) { }

  private baseUrl = AppConstants.baseURL + "/api/v1"

  register(user:any): Observable<any>{
      return this.httpClient.post(`${this.baseUrl}/user/save`,user,{ responseType: 'text' })
  }

}
