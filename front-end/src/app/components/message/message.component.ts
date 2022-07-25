import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  chats : any
  ele :any
  mobile:any
  constructor() { }


  ngOnInit(): void {

    if (window.screen.width < 576) { // 768px portrait
      console.log(window.screen.width)
      this.mobile = true;
      setTimeout(() => {
        this.openNav()
          
        }, 100);
    }
    
    this.chats =[{username:"abc"},{username:"bcc"},{username:"abc"},{username:"bcc"},{username:"abc"},{username:"bcc"},{username:"abc"},{username:"bcc"},{username:"abc"},{username:"bcc"}]
  }


  clickedUser(username:string){
    console.log(username);
  }
 
 openNav() {
  (document.querySelector('#mySidenav') as HTMLElement).style.width = "350px";
  (document.querySelector('#msg_history') as HTMLElement).style.display = "none";
  (document.querySelector('.mesgs') as HTMLElement).style.display = "none";
  (document.querySelector('#mySidenav') as HTMLElement).style.display = "block";
  (document.querySelector('#inpsend') as HTMLElement).style.display = "none";
  (document.querySelector('#btn-send') as HTMLElement).style.display = "none";
  (document.querySelector('#recent') as HTMLElement).style.display = "none";
  (document.querySelector('#mySidenav') as HTMLElement).style.transition = "0.5s";
  }
  
  closeNav() {
    (document.querySelector('.mesgs') as HTMLElement).style.display = "block";
    (document.querySelector('#recent') as HTMLElement).style.display = "block";
    (document.querySelector('#btn-send') as HTMLElement).style.display = "block";
    (document.querySelector('#inpsend') as HTMLElement).style.display = "block";
    (document.querySelector('#mySidenav') as HTMLElement).style.width  = "0";
    (document.querySelector('#mySidenav') as HTMLElement).style.display = "none";
    (document.querySelector('#msg_history') as HTMLElement).style.display = "block";
  }
}
