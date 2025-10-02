import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule, CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)

  detailsProduct:IProduct | null = null


  customOptionsProduct: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: true,
      navSpeed: 700,
      navText: ['', ''],
      items:1,
      nav: false
    }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(res)=>{
        let idProduct = res.get('id');
        // call API
        this._ProductsService.getSpecificProduct(idProduct!).subscribe({
          next:(res)=>{
            console.log(res.data);
            this.detailsProduct = res.data

          },
          error:(er)=>{
            console.log(er);

          }
        })
      },
      error:(er)=>{
        console.log(er);

      }
    })

  }

  addCart(id:string){
    this._CartService.addToCart(id).subscribe({
      next:(res)=>{
        this._CartService.cartNumber.set(res.numOfCartItems)
        console.log(this._CartService.cartNumber());
        this._ToastrService.success(res.message, "FreshCart")
      }
    })
  }
}
