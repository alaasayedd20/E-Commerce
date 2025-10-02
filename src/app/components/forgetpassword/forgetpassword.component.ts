import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _AuthService=inject(AuthService)
  private readonly _Router=inject(Router)

  step:number = 1
  isLoading:boolean = false

  verifyEmail:FormGroup = this._FormBuilder.group({
    email:[null,[Validators.required,Validators.email]],
  })

  verifyCode:FormGroup = this._FormBuilder.group({
    resetCode:[null,[Validators.required,Validators.pattern(/^\w{6}$/)]],
  })

  resetPassword:FormGroup = this._FormBuilder.group({
    email:[null,[Validators.required, Validators.email]],
    newPassword:[null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  })

  verifyEmailSubmit(){
    let emailVal = this.verifyEmail.get('email')?.value;
    this.resetPassword.get('email')?.patchValue(emailVal)
    this.isLoading = true
    this._AuthService.setEmailVerify(this.verifyEmail.value).subscribe({
      next:(res)=>{
        this.isLoading = false
        if(res.statusMsg == "success"){
          this.step = 2
        }

      },
      error:(er)=>{
        console.log(er);
        this.isLoading = false
      }
    })
  }
  verifyCodeSubmit(){
    this.isLoading = true
    this._AuthService.setCodeVerify(this.verifyCode.value).subscribe({
      next:(res)=>{
        this.isLoading = false
        if(res.status == "Success"){
          this.step = 3
        }

      },
      error:(er)=>{
        console.log(er);
        this.isLoading = false
      }
    })
  }
  resetPasswordSubmit(){

    this.isLoading = true
    this._AuthService.setResetPassword(this.resetPassword.value).subscribe({
      next:(res)=>{
        this.isLoading = false
        localStorage.setItem('userToken', res.token)
        this._AuthService.saveUserData()
        this._Router.navigate(['/home'])

      },
      error:(er)=>{
        console.log(er);
        this.isLoading = false
      }
    })
  }
}
