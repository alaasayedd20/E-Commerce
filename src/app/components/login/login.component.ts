import { error } from 'console';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy{
  private readonly _FormBuilder=inject(FormBuilder);
  private readonly _AuthService=inject(AuthService);
  private readonly _Router=inject(Router);
  getAllProductsSub!:Subscription

  isLoading:boolean = false;
  msgErr:string = "";

  loginForm:FormGroup = this._FormBuilder.group({
    email:[null,[Validators.required, Validators.email]],
    password:[null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  })

  loginSubmit(){
    this.isLoading = true
    this.msgErr = ""
    if(this.loginForm.valid){
      this.getAllProductsSub = this._AuthService.setLoginValue(this.loginForm.value).subscribe({
        next:(res)=>{
          this.isLoading = false
          if(res.message == "success"){

            localStorage.setItem('userToken', res.token)
            this._AuthService.saveUserData()
            this._Router.navigate(['/home'])
          }

        },
        error:(er)=>{
          this.msgErr = er.error.message
          this.isLoading = false
        }
      })
    }
    else{
      this.loginForm.markAllAsTouched()
    }
  }
  ngOnDestroy(): void {
    this.getAllProductsSub?.unsubscribe()
  }

}
