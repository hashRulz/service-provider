import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Chat } from 'src/app/models/chat';
import { WebsocketService } from 'src/app/service/websocket.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  title = 'angular8-springboot-websocket';

  webSocketAPI: WebsocketService;
  greeting: any;
  name: string;
  ngOnInit() {
    this.webSocketAPI = new WebsocketService(new TestComponent());
  }

  connect(){
    this.webSocketAPI._connect();
  }

  disconnect(){
    this.webSocketAPI._disconnect();
  }

  sendMessage(){
    this.webSocketAPI._send(this.name);
  }

  handleMessage(message:any){
    this.greeting = message;
  }
}
