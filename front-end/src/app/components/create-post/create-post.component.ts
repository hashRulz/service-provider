import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/service/common.service';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { Store } from 'src/app/util/Store';
import {MatSnackBar} from "@angular/material/snack-bar";


interface Job{
  id:number
  name:string;
  description:string;
  readMore:boolean;
}

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['post','desc'];
  public dataSource = new MatTableDataSource<Job>()
  retrievedImage: any;
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;
  retrieveResonse: any;
  base64Data: any;
  id:any;
  temp: number =0;

  post: any ={
    userName: null,
    title: null,
    category: null,
    imageid: null,
    description: null
  }

  constructor(private route:Router,
    private uploadService:FileUploadService,
    public store: Store,
    public commonService: CommonService,
              private _snackBar: MatSnackBar) { }

  json = [{
    id:1,
    name:"abc",
    description :"This is sf sf s fs fs f s f sf s fsfsfsfsf sf s f sfsf sf sf s fsf sf sfsfsf sf sfsfsfsf sf s fsfsfsf sf sfs f sfsfsfsf sfsfsfs fssfsfsf long paragraph text containing several words continued. An example of implementing dynamically limit long text",
    readMore:false,
    length:150
  },
  ]

  ngOnInit(): void {
    this.dataSource.data = this.json as Job[]
    // this.imageInfos = this.uploadService.getFiles();
  }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;

     this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      this.temp = this.temp +1;
      const numberOfFiles = this.selectedFiles.length ;

      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          console.log(this.previews.length);

          if(this.previews.length > 5){

            alert("Cannot upload more than 6")
          }else{
            this.previews.push(e.target.result);

          }
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  uploadFiles(): void {
    this.message = [];
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        console.log("sss")
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {

    this.progressInfos[idx] = { value: 0, fileName: file.name };
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', file);
    if (file) {
      this.uploadService.upload(uploadImageData).subscribe({

        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            this.imageInfos = this.uploadService.getFiles();
          }
        },
        error: (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        }});
    }
  }

  getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.uploadService.getImage(1).subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

  currentUser() {
    return this.store.getData('username');
  }

  addPost(){
    this.post.userName = this.currentUser();
    this.commonService.addPost(this.post).subscribe(
      res =>{
        console.log(res);
        this.post={
          userName: null,
          title: null,
          category: null,
          imageid: null,
          description: null
        }
        this._snackBar.open("suceess");
      },
    error => {
      this._snackBar.open('Failure.!!!')
    });

  }
}
