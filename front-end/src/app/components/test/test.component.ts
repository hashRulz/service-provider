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

  constructor(public webSocketService: WebsocketService) { }

  ngOnInit(): void {
    this.webSocketService.openWebSocket();
  }

  ngOnDestroy():void{
    this.webSocketService.closeWebSocket();
  }

  sendMessage(sendForm: NgForm) {
    console.log(sendForm.value)
    const chat = new Chat(sendForm.value.user, sendForm.value.message);
    this.webSocketService.sendMessage(chat);
    sendForm.controls.message.reset();
  }
}
