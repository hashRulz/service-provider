import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  content : any ="Join as a client";
  signUptype : boolean = true;


  contentChange(val : any){
    console.log(val);
    if(val=='true' || val == null){
      this.content ="Join as a Business/Expert";
    }
    if(val=='false')
      this.content= "Join as a client"

  }
  redirect(){
    this.router.navigate(['register'])
  }

}
