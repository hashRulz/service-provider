import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { TestComponent } from '../components/test/test.component';
import { Chat } from '../models/chat';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  webSocketEndPoint: string = 'http://localhost:8081/chat';
    topic: string = "/topic/messages";
    stompClient: any;

    appComponent: TestComponent;
    constructor(appComponent: TestComponent){
        this.appComponent = appComponent;
    }
  
    _connect() {
      console.log("Initialize WebSocket Connection");
      let ws = new SockJS(this.webSocketEndPoint);
      this.stompClient = Stomp.over(ws);
      const _this = this;
      _this.stompClient.connect({}, function (frame:any) {
          _this.stompClient.subscribe(_this.topic, function (sdkEvent:any) {
              // _this.onMessageReceived(sdkEvent);
          });
          //_this.stompClient.reconnect_delay = 2000;
      },);
  };
  _disconnect() {
    if (this.stompClient !== null) {
        this.stompClient.disconnect();
    }
    console.log("Disconnected");
}

// on error, schedule a reconnection attempt
errorCallBack(error:any) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
        this._connect();
    }, 5000);
}

/**
* Send message to sever via web socket
* @param {*} message 
*/
_send(message:any) {
    console.log("calling logout api via web socket");
    this.stompClient.send("/app/hello", {}, JSON.stringify(message));
}

onMessageReceived(message:any) {
    console.log("Message Recieved from Server :: " + message);
    this.appComponent.handleMessage(JSON.stringify(message.body));
}
}
