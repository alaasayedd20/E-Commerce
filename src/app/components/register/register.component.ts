import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../core/services/auth.service';
import { error } from 'console';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy{

  private readonly _AuthService = inject(AuthService)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Router = inject(Router)
  getAllProductsSub!:Subscription

  msgErr:string = "";
  isLoading:boolean=false;


  registerForm:FormGroup = this._FormBuilder.group({
    name:[null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email:[null, [Validators.required, Validators.email]],
    password:[null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    rePassword:[null],
    phone:[null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
  }, {validators: this.confirmPassword})


  // registerForm:FormGroup = new FormGroup({
  //   name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  //   email: new FormControl(null, [Validators.required, Validators.email]),
  //   password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
  //   rePassword: new FormControl(null),
  //   phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  // }, this.confirmPassword)

  registerSubmit():void{
    this.isLoading = true;
    this.msgErr = ""
    if(this.registerForm.valid){
      this.getAllProductsSub = this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
        next:(res)=>{
          if(res.message == 'success'){
            this._Router.navigate(['/login'])
          }
          console.log(res);
          this.isLoading = false
        },
        error:(er)=>{
          this.msgErr = er.error.message
          console.log(er);
          this.isLoading = false

        }
      })
    }
    else{
      this.registerForm.setErrors({mismatch:true})
      this.registerForm.markAllAsTouched()
    }
  }





  confirmPassword(g:AbstractControl){
    if(g.get('password')?.value === g.get('rePassword')?.value){
      return null;
    }
    else{
      return {mismatch:true}
    }
  }

  ngOnDestroy(): void {
      this.getAllProductsSub?.unsubscribe()
  }

}
