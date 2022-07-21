import { Injectable } from '@angular/core';
import { Chat } from '../models/chat';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  webSocket: WebSocket;
  chatMessages: Chat[] = []

  constructor() {
    this.webSocket = new WebSocket('http://localhost:8081/chat/send');
   }
  
  public openWebSocket(){
   

    this.webSocket.onopen = (event)=>{
      console.log('open',event)
    };

    this.webSocket.onmessage = (event) =>{
      const chat = JSON.parse(event.data);
      this.chatMessages.push(chat)
    }

    this.webSocket.onclose = (event)=>{
      console.log('close',event)
    }
  }

  public sendMessage(chat: Chat){
    this.webSocket.send(JSON.stringify(chat))
  }

  public closeWebSocket(){
    this.webSocket.close();
  }
}
