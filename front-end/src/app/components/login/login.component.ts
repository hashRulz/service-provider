import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { HomeComponent } from '../nav/home.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup ;
  loading :boolean = false;
  submitted :boolean = false;
  // username: string ="";
  // password : string="";
  errorMessage = 'Invalid Credentials';
  successMessage: string="";
  invalidLogin = false;
  loginSuccess = false;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService:AuthService ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });

  }

  onSubmit(){
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
  }else{
    console.log()
    this.authenticationService.authenticationService(this.loginForm.value.username, this.loginForm.value.password).subscribe((result)=> {
      // NavComponent.prototype.isLoggedIn=true;
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      HomeComponent.prototype.updateUserLoggedIn()
      this.router.navigate(['']);
      // HomeComponent.
        
     
    }, (error) => {
      // NavComponent.prototype.isLoggedIn=false;
      this.invalidLogin = true;
      this.loginSuccess = false;
    });   
  }

  }
  get formControls() { return this.loginForm.controls; }


}
