import { Component, OnInit } from '@angular/core';
import {render} from 'creditcardpayments/creditCardPayments'
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { RouteConfigLoadEnd, Router } from '@angular/router';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

  title = 'ng-carousel-demo';
  mypaypal: any
  
  images = [
    {title: '', short: '', src: "https://picsum.photos/id/700/900/500"},
    {title: '', short: '', src: "https://picsum.photos/id/1011/900/500"},
    {title: '', short: '', src: "https://picsum.photos/id/984/900/500"}
  ];
  

  constructor(config: NgbCarouselConfig, private route:Router) { 
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;

    
  }

  ngOnInit(): void {
    render({
      id:"#mypaypal",
      currency:"USD",
      value:"100.00",
      onApprove : (details) =>{
        alert("Transaction succesfull")
      },
    });
  }

  openChat(){
    this.route.navigate(['chat'])
  }
}
