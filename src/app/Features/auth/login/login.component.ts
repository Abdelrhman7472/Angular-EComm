import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../Core/Services/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { format } from 'node:path';
import { group } from 'node:console';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {private auth:AuthService=inject(AuthService);
private router:Router=inject(Router);


errorMessage=signal<string>('');

isLoading=signal<boolean>(false);

loginForm:FormGroup=new FormGroup({
  email:new FormControl(null , [Validators.required , Validators.email]),
password:new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/)]),


});

loginSubmit(){

  this.isLoading.set(true);
  if(this.loginForm.valid){

this.auth.loginAPI(this.loginForm.value).subscribe({
next:(res)=>{

  this.isLoading.set(false);

localStorage.setItem('userToken',res.token);

this.auth.setUserData();

this.router.navigate(['/home']);

}
,
error:(err)=>{
  console.log(err);
  this.errorMessage.set(err.error.message);
  this.isLoading.set(false);
}
} );

}
}
}
