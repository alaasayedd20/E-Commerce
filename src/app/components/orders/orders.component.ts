import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit{
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _OrdersService=inject(OrdersService)

  orders:FormGroup = this._FormBuilder.group({
    details:[null, [Validators.required]],
    phone:[null, [Validators.required]],
    city:[null, [Validators.required]]
  })

  ordersSubmit( ){
    console.log(this.orders.value);
    this._OrdersService.chechOut(this.cartId, this.orders.value).subscribe({
      next:(res)=>{
        if(res.status == "success"){
          window.open(res.session.url, '_self')
        }

      },
      error:(er)=>{
        console.log(er);

      }
    })
  }

  cartId: string | null = ""
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.cartId = params.get('id')
        console.log(this.cartId);

      }
    })
  }
}
