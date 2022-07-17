import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { SignUpWayComponent } from './sign-up-way/sign-up-way.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/nav/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatMenuModule} from '@angular/material/menu';
import { ClientComponent } from './components/client/client.component';
import {MatTableModule} from '@angular/material/table';
import { SignupService } from './service/signup.service';
import { HttpClientModule } from '@angular/common/http';
// import { ChatComponent } from './components/chat/chat.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BusinessComponent } from './components/business/business.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChatComponent } from './components/chat/chat.component';
import { FooterComponent } from './components/footer/footer.component';
import { MessageComponent } from './components/message/message.component';
import { BusinessProfileComponent } from './components/business-profile/business-profile.component';
import { PostJobComponent } from './components/post-job/post-job.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CreatePostComponent } from './components/create-post/create-post.component';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    // SignUpWayComponent,
    SignUpComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ClientComponent,
    BusinessComponent,
    ChatComponent,
    FooterComponent,
    MessageComponent,
    BusinessProfileComponent,
    PostJobComponent,
    CreatePostComponent
  ],
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    NgbModule,
    HttpClientModule,
    MatTableModule,
    MatMenuModule,
    FontAwesomeModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
