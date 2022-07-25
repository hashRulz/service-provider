import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientComponent } from './components/client/client.component';
import { BusinessComponent } from './components/business/business.component';
import { MessageComponent } from './components/message/message.component';
import { BusinessProfileComponent } from './components/business-profile/business-profile.component';
import { PostJobComponent } from './components/post-job/post-job.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: DashboardComponent },
  { path: 'client', component: ClientComponent },
  { path: 'business', component: BusinessComponent },
  { path: 'message',component:MessageComponent},
  { path: 'bprofile', component:BusinessProfileComponent},
  { path: 'post', component:PostJobComponent},
  { path: 'create-post',component:CreatePostComponent},
  { path: 'test',component:TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
