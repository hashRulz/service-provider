import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AppConstants} from "../configuration/AppConstant";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;

  private baseUrl = AppConstants.baseURL;
  constructor(private http: HttpClient) { }

  upload(file: FormData):Observable<any>{
  console.log(file)
   return this.http.post(`${this.baseUrl}/image/upload`, file, {
   reportProgress: true,
   observe: 'events' })

  }



  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }

  getImage(id:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/image/get/${id}`);
  }

}
