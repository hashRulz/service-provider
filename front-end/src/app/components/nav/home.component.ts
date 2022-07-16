import { Component, Injectable, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { faSignIn, faMoneyBill, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

@Injectable()
export class HomeComponent implements OnInit {
  faSignIn = faSignIn;
  faMoneyBill = faMoneyBill;
  faQuestion =faQuestion;
  userName:string ="";
  userLoggedIn:boolean;

 

  ngOnInit(): void {
    
    if(sessionStorage.getItem('authenticatedUser')){
      this.userLoggedIn = this.auth.isUserLoggedIn();
    }
 
  }
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private route: Router,
    private auth:AuthService) {
      // this.isLoggedIn = auth.isLoggedIn();
    }

  goHome(){
    setTimeout(() => {
    this.route.navigate(['/'])
      
    }, 1000);
  }

  updateUserLoggedIn(){

      this.userLoggedIn = true;
      
  }

  updateUserLogout(){
    this.userLoggedIn = false;
  }

  handleLogout() {
    
    this.auth.logout();
    this.route.navigate(['/'])
  }
 
  goProfile(){
    this.route.navigate(['bprofile'])
  }

  goPost(){
    this.route.navigate(['post'])
  }
}
