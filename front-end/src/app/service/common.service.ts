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
}
