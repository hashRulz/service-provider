import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/service/signup.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: UntypedFormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private singup:SignupService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      retypePassword: ['', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;


    if (this.registerForm.invalid) {
      return;
    }
    else{
      this.singup.register(this.registerForm.value).subscribe((res)=>{
        console.log(res)
        if(res === "success"){
          this.loading = false;
          this.router.navigate(['/'])
        }
      })
    }

    this.loading = true;
  }
  onPasswordChange() {
    if (this.f.password.value == this.f.retypePassword.value)
      this.f.retypePassword.setErrors(null);
    else
      this.f.retypePassword.setErrors({ mismatch: true })

  }


}
