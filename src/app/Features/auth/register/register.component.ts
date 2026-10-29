import { Component, inject, signal } from '@angular/core';
import {Router} from '@angular/router'
import{FormControl, FormGroup, ReactiveFormsModule ,Validators} from '@angular/forms'
import { format } from 'path';
import { AuthService } from '../../../Core/Services/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {

private auth:AuthService=inject(AuthService)
private router:Router=inject(Router);


errorMessage=signal<string>('');

isLoading=signal<boolean>(false);

registerForm:FormGroup=new FormGroup({
  name :new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
  email:new FormControl(null , [Validators.required , Validators.email]),
password:new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/)]),
  rePassword:new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/)]),
  phone:new FormControl(null, [Validators.required , Validators.pattern(/^(01)[0125][0-9]{8}$/)]),

}, this.customValidator);

// Button
registerSubmit(){

  this.isLoading.set(true);
  if(this.registerForm.valid){
this.auth.registerAPI(this.registerForm.value).subscribe({
next:(res)=>{

  if(res.message === 'success')
  {
    this.isLoading.set(false);
    this.router.navigate(['/login']);
  }

}
,
error:(err)=>{
  console.log(err.error.message);
  this.errorMessage.set(err.error.message);
  this.isLoading.set(false);
}
} );

}
}

customValidator(g:any)
{

  if(g.get('password').value === g.get('rePassword').value)
  {
    return null
  }

  else {
    return {'UnMatched':true}
  }

}
}
