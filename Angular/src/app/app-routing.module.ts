import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CommandsComponent } from './components/commands/commands.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [

    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'commands',
        component: CommandsComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
