import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import {ChatComponent} from "../chat/chat.component";
import {MatDialog} from "@angular/material/dialog";

interface Bussiness{
  id:number
  name:string;
  description:string;
  readMore:boolean;
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['id'];
  public dataSource = new MatTableDataSource<Bussiness>()
  description!:string;


  json = [{
    id:1,
    name:"abc",
    description :"This is sf sf s fs fs f s f sf s fsfsfsfsf sf s f sfsf sf sf s fsf sf sfsfsf sf sfsfsfsf sf s fsfsfsf sf sfs f sfsfsfsf sfsfsfs fssfsfsf long paragraph text containing several words continued. An example of implementing dynamically limit long text",
    readMore:false,
    length:150
  },
  {id:2,description :"e of implementing dynamically limit long text",length:20}]

  constructor(private route:Router,
              private dialogBox: MatDialog) {

  }
//<span [attr.id]="'dots'+row.id">...</span><span [attr.id]="'more'+row.id" style="display: none"></span>
  ngOnInit(): void {
    this.dataSource.data = this.json as Bussiness[]

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  seeBusiness(){
    this.route.navigate(['/business']);
  }

  openChatModal(){
    const dialogRef = this.dialogBox.open(ChatComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
