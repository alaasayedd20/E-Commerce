import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  private readonly _CartService=inject(CartService)
  cartDetails:ICart = { } as ICart

  ngOnInit(): void {
      this._CartService.getProductsCart().subscribe({
        next:(res)=>{
          this.cartDetails = res.data
        },
        error:(er)=>{
          console.log(er);

        }
      })
  }

  deleteCartItem(id:string){
    this._CartService.deleteSpecificCartItem(id).subscribe({
      next:(res)=>{
        this.cartDetails = res.data
        this._CartService.cartNumber.set(res.numOfCartItems)
      },
      error:(er)=>{
        console.log(er);

      }
    })
  }

  updateQuantity(id:string, cnt:number){
    this._CartService.updateProductQuantity(id, String(cnt)).subscribe({
      next:(res)=>{
        this.cartDetails = res.data
        this._CartService.cartNumber.set(res.numOfCartItems)
      },
      error:(er)=>{
        console.log(er);

      }
    })
  }

  clearItems(){
    this._CartService.clearCart().subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message == "success"){
          this._CartService.cartNumber.set(0)
          this.cartDetails = { } as ICart
        }
      },
      error:(er)=>{
        console.log(er);

      }
    })
  }

}
