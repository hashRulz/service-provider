import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import * as SockJS from 'sockjs-client';
import { Chat } from 'src/app/models/chat';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/service/user.service';
import { WebsocketService } from 'src/app/service/websocket.service';
import * as Stomp from 'stompjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  url = 'http://localhost:8081';
  otherUser?: User;
  thisUser: User = JSON.parse(sessionStorage.getItem('user')!);
  channelName?: string;
  socket?: WebSocket;
  stompClient: Stomp.Client;
  newMessage = new FormControl('');
  messages?: Observable<Array<Chat>>;
  clickedUser:string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private http:HttpClient,
    private el: ElementRef) {}


  ngOnInit(): void {
   
  }

  checkUser(user:string){
    this.clickedUser = user;
    let clickedId = this.clickedUser;

    this.userService
      .getLoggedInUser(clickedId)
      .subscribe((data: User | undefined) => {
        console.log(data)
        this.otherUser = data;
        // this.otherUser.propic = "data:image/jpeg;base64,"+ this.otherUser.propic;
        
      });
    this.connectToChat();
        console.log(this.el)
        this.el.nativeElement.querySelector("#chat").scrollIntoView();
  }

  ngAfterViewChecked(): void {
    this.scrollDown();
  }

  scrollDown(){
    var container = this.el.nativeElement.querySelector("#chat");
    container.scrollTop = container.scrollHeight;
  }

  connectToChat() {
    console.log("connectingggg")
    const id1 = this.thisUser.id!;
    const nick1 = this.thisUser.fullName;
    const id2 = this.otherUser?.id!;
    const nick2 = this.otherUser?.fullName!;

    if (id1 > id2) {
      this.channelName = nick1 + '&' + nick2;
    } else {
      this.channelName = nick2 + '&' + nick1;
    }
    this.loadChat();
    console.log('connecting to chat...');
    this.socket = new SockJS(this.url + '/chat');
    this.stompClient = Stomp.over(this.socket);

    this.stompClient.connect({}, (frame) => {
      //func = what to do when connection is established
      console.log('connected to: ' + frame);
      this.stompClient!.subscribe(
        '/topic/messages/' + this.channelName,
        (response) => {
          //func = what to do when client receives data (messages)
          this.loadChat();
        }
      );
    });
  }

  sendMsg() {
    if (this.newMessage.value !== '') {
      this.stompClient.send(
        '/app/chat/' + this.channelName,
        {},
        JSON.stringify({
          sender: this.thisUser.fullName,
          t_stamp: 'to be defined in server',
          content: this.newMessage.value,
        })
      );
      this.newMessage.setValue('');
    }
  }

  loadChat(){
    this.messages = this.http.post<Array<Chat>>(this.url+'/getMessages' ,  this.channelName);
    this.messages.subscribe((data: Chat[]) => {
      let mgs:Array<Chat> = data;
      mgs.sort((a, b) => (a.ms_id > b.ms_id) ? 1 : -1)
      this.messages = of(mgs);
    })
    console.log(this.messages);
  }

  whenWasItPublished(myTimeStamp: string) {
    const endDate = myTimeStamp.indexOf('-');
    return (
      myTimeStamp.substring(0, endDate) +
      ' at ' +
      myTimeStamp.substring(endDate + 1)
    );
  }
}
