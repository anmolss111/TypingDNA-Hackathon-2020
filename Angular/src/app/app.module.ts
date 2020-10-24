import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CommandsComponent } from './components/commands/commands.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './components/signup/signup.component';
import { AlertBoxPasswordComponent } from './components/alert-box-password/alert-box-password.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
	AppComponent,
	LoginComponent,
	CommandsComponent,
	SignupComponent,
	AlertBoxPasswordComponent
  ],
  imports: [
	BrowserModule,
	AppRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	HttpClientModule,
	BrowserAnimationsModule,
	MatTabsModule,
	MatDialogModule,
	MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
