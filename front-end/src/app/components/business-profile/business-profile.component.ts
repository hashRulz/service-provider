import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../service/common.service";
import {Store} from "../../util/Store";
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css']
})
export class BusinessProfileComponent implements OnInit {

  isSearched: boolean = false;
  userForm: FormGroup;
  userList: any[] = [];
  roomList: any[] = [];
  isSubmit: boolean = false;
  viewOnly: boolean = false;
  isUpdate: boolean = false;
  searchForm: FormGroup;
  isDisabled: boolean = false;
  isShow: boolean = false;
  unamePattern = "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$";

  constructor(private fb: FormBuilder, private masterService: CommonService,
              public store: Store) {
    this.userForm = fb.group({
      id: ['',[Validators.required]],
      fullName: ['', [Validators.required]],
      last: ['', [Validators.required]],
      // username: [''],
      designation: [''],
      password: ['',[!this.isShow ? Validators.nullValidator : Validators.minLength(8),Validators.required,Validators.pattern]],
      reytpePassword: ['',[!this.isShow ? Validators.nullValidator : Validators.minLength(8),Validators.required ]],
      phone: [''],
      active: [true],
      username:['']
    });
    this.searchForm = fb.group({
      active: [],
      notPaged: [],
      name: [],
      idNumber: [],
      phone: [],
      sortDescBy: [],
      status: []
    });
  }

  ngOnInit(): void {
    this.getUsers();
    // this.userForm.reset();
    // this.reset();
  }

  getUsers() {
    this.isSearched = true;
    this.userList = [];
    this.searchForm.controls['notPaged'].setValue(true)
    this.searchForm.controls['sortDescBy'].setValue('id')
    // this.searchForm.controls['status'].setValue('active');
    // @ts-ignore
    this.masterService.getUsers(this.currentUser()).subscribe((res: any) => {
      this.userList.push(res);
      console.log(res);
    })
  }

  submit() {
    this.viewOnly = true;
    this.isSubmit = true;
    if (this.userForm.invalid) {
      this.viewOnly = false;
      if (this.isUpdate === true)
        this.update();
      return;
    } else {
      this.saveOrUpdate()
    }
  }


  saveOrUpdate() {
    if (this.isUpdate === true) {
      this.update();
    } else {
      this.save();
    }
  }

  save(): void {
    console.log("heloww");
    this.viewOnly = true;
    this.userForm.controls['email'].setValue(this.userForm.controls['id'].value);
    // this.userForm.controls['status'].setValue('ACTIVE');
    this.masterService.checkUserDuplicateValues(this.userForm.controls['email'].value,
      // @ts-ignore
      this.userForm.controls['id'].value).subscribe((r1: any) => {
      if (r1?.name == true) {
        this.viewOnly = false;
        // @ts-ignore
        alert({
          icon: 'error',
          title: 'A User is already exist for this email!',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        // @ts-ignore
        this.masterService.saveUser(this.userForm.value).subscribe(res => {
// @ts-ignore
          alert({
            icon: 'success',
            title: 'User has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          this.isSubmit = false;
          this.userForm.reset();
          this.getUsers();
          this.viewOnly = false;
        }, // @ts-ignore
            error => {
          this.viewOnly = false;
        })
      }
    });

  }

  disable(user: any) {
    user.status = 'INACTIVE';
    // @ts-ignore
    this.masterService.updateUsers(user).subscribe(res => {
      console.log(res)
      this.getUsers();
      // @ts-ignore
      alert({
        icon: 'success',
        title: 'User has been Deactivated ',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  enable(user: any) {
    user.status = 'ACTIVE';
    // @ts-ignore
    this.masterService.updateUsers(user).subscribe(res => {
      console.log(res)
      this.getUsers();
      // @ts-ignore
      alert({
        icon: 'success',
        title: 'User has been Activated ',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  update() {
    this.viewOnly = true;
    this.isDisabled= false;
    // @ts-ignore
    this.masterService.updateUsers(this.userForm.value).subscribe(res => {
      this.isUpdate = false;
      this.userForm.reset();
      this.roomList = [];
      this.getUsers();
      // this.selectedFile = undefined;
        // @ts-ignore
      alert({
        icon: 'success',
        title: 'User has been updated',
        showConfirmButton: false,
        timer: 1500
      })
      this.isSubmit = false;
      this.viewOnly = false;
    },// @ts-ignore
        error => {
      this.viewOnly = false;
    })
  }

  checkError(formControlName: string) {
    return this.userForm.controls[formControlName].invalid
      && (this.userForm.controls[formControlName].touched || this.userForm.controls[formControlName].dirty || this.isSubmit);
  }

  edit(values: any, viewOnly: boolean) {
    this.isDisabled= true;
    this.isShow = !this.isShow;
    this.viewOnly = viewOnly;
    this.isUpdate = true;
    this.roomList = [];
    this.userForm.reset()
    for (let key in this.userForm.value) {
      this.userForm.controls[key].patchValue(values[key]);
      // this.userForm.controls['pwd'].patchValue('');
    }

  }

  reset() {
    this.viewOnly = false;
    this.userForm.reset();
    this.isSubmit = false;
    this.isUpdate = false;
  }


  resetSearchFiltersAndSearch() {
    this.searchForm.reset();
    this.getUsers()
  }

  onPasswordChange() {
    if (this.confirm_password.value == this.password.value) {
      this.confirm_password.setErrors(null);
    } else {
      this.confirm_password.setErrors({ mismatch: true });
    }
  }

  // getting the form control elements
  get password(): AbstractControl {
    return this.userForm.controls['password'];
  }

  get confirm_password(): AbstractControl {
    return this.userForm.controls['reytpePassword'];
  }

  get email(): AbstractControl{
    return this.userForm.controls['id'];
  }
  currentUser() {
    return sessionStorage.getItem('authenticatedUser')
  }
}
