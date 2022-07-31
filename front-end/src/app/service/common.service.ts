import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../configuration/AppConstant';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  addPost(post: any): Observable<any>{
    const url = AppConstants.baseURL + AppConstants.createPost;
    return this.http.post(url, post,{ responseType: 'text' });
  }

  saveUser(value: any) {

  }

  checkUserDuplicateValues(value: any, value2: any) {

  }

  getUsers(uname: any) {
    // const url = AppConstants.baseURL + AppConstants.getUser +'${uname}';
    return this.http.get(`http://localhost:8081/api/v1/getLoggedUser/${uname}`);
  }

  updateUsers(user: any) {

  }
}
