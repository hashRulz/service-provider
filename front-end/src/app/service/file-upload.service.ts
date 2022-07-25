import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  private baseUrl = 'http://localhost:8081';
  constructor(private http: HttpClient) { }

  upload(file: FormData):Observable<any>{
  console.log(file)
   return this.http.post('http://localhost:8081/image/upload', file, {
   reportProgress: true, 
   observe: 'events' })
      
  }

 
  
  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }

  getImage(id:number):Observable<any>{
    return this.http.get(`http://localhost:8081/image/get/${id}`);
  }

}
