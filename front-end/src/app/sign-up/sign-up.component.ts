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

  content : any ="Regjistrohu si klient";
  signUptype : boolean = true;


  contentChange(val : any){
    console.log(val);
    if(val=='true' || val == null){
      this.content ="Regjistrohu si Biznes/ekspert";
    }
    if(val=='false')
      this.content= "Regjistrohu si klient"

  }
  redirect(){
    this.router.navigate(['register'])
  }

}
