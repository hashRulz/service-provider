import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from '../nav/home.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
    // HomeComponent.prototype.reloadPage()

  }

  goRegister(){
    this.route.navigate(['/signup'])
  }

  clickDiv(event:any){
    console.log(event)
    //get data from back end for each category using "event"
    this.route.navigate(['/client'])
  }
}
