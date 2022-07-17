import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

interface Job{
  id:number
  name:string;
  description:string;
  readMore:boolean;
}

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {

  
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['post','desc','action'];
  public dataSource = new MatTableDataSource<Job>()
  
  constructor() { }

  json = [{
    id:1,
    name:"abc",
    description :"This is sf sf s fs fs f s f sf s fsfsfsfsf sf s f sfsf sf sf s fsf sf sfsfsf sf sfsfsfsf sf s fsfsfsf sf sfs f sfsfsfsf sfsfsfs fssfsfsf long paragraph text containing several words continued. An example of implementing dynamically limit long text",
    readMore:false,
    length:150
  },
  {id:2,description :"e of implementing dynamically limit long text",length:20},
  {id:3,description :"e of implementing dynamically limit long text",length:20}]


  ngOnInit(): void {
    this.dataSource.data = this.json as Job[]
  }

}
