import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';

import { JsonSchemaFormModule, Bootstrap4FrameworkModule  } from 'angular2-json-schema-form';

import { AppComponent } from './app.component';
import {HttpModule} from "@angular/http";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import {AccountService} from './services/account.service';
import { ProfileComponent } from './components/profile/profile.component';
import {UrlPermission} from './urlPermission/url.permission';

import { AppRoutingModule } from './app-routing.module';
import { MessageService } from './services/messages.service';
import { RequestCache, RequestCacheWithMap } from './services/request-cache.service';
import { HttpErrorHandler } from './services/http-error-handler.service';
import { CommonModule } from '@angular/common';

import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { MenuItem, MenubarModule, InputTextModule, DataTableModule, ButtonModule, DialogModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/growl';
import {PanelModule} from 'primeng/panel';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {CalendarModule} from 'primeng/calendar';
import {SpinnerModule} from 'primeng/spinner';
import {CardModule} from 'primeng/card';
import {PasswordModule} from 'primeng/password';


import { PapersComponent } from './components/papers/papers.component';
import { PaperService } from './services/paper.service';
import { StudentsComponent } from './components/students/students.component';
import { StudentService } from './services/student.service';
import { HomeComponent } from './components/home/home.component';
import { HeadermenuComponent } from './components/headermenu/headermenu.component';


@NgModule({
  declarations: [
    AppComponent,
    PapersComponent,
    HomeComponent,
    StudentsComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HeadermenuComponent,
  ],
  imports: [InputTextModule, DataTableModule, ButtonModule, DialogModule, HttpModule, CardModule, PasswordModule,
    BrowserModule, BrowserAnimationsModule,
    HttpClientModule, Bootstrap4FrameworkModule, JsonSchemaFormModule.forRoot(Bootstrap4FrameworkModule),
    FormsModule, ReactiveFormsModule , JsonSchemaFormModule,
    AppRoutingModule, MenubarModule, MessagesModule, MessageModule, GrowlModule, PanelModule, ConfirmDialogModule, CalendarModule, SpinnerModule
  ],
  providers: [
    AuthService, AccountService, UrlPermission,
    PaperService, StudentService, ConfirmationService,
    MessageService,
    { provide: RequestCache, useClass: RequestCacheWithMap },
    HttpErrorHandler
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }