import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

interface Bussiness{
  id:number
  name:string;
  description:string;
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
  readMore=false;
  longText = ``;
  textLength = 0;

  json = [{
    id:1,
    name:"abc",
    description :"This is long paragraph text containing several words continued. An example of implementing dynamically limit long text"
  },{id:2,description :"e of implementing dynamically limit long text"}]

  constructor() { }
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
  readMoreMethod(id:number){
    if(id){
      this.readMore = true;
    }
  }
  
}
