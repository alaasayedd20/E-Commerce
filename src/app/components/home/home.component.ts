import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o'
import { RouterLink } from "@angular/router";
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, TermtextPipe, FormsModule, SearchPipe, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly _ProductsService=inject(ProductsService);
  private readonly _CategoriesService=inject(CategoriesService);
  private readonly _CartService=inject(CartService);
  private readonly _ToastrService=inject(ToastrService);
  private readonly _NgxSpinnerService=inject(NgxSpinnerService);

  text:string=""

  getAllProductsSub!:Subscription
  productsList:IProduct[] = []
  categoriesList:ICategory[] = []

  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true
  }

  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }


  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categoriesList = res.data
        console.log(res);

      }
    })
    this.getAllProductsSub = this._ProductsService.getAllProducts().subscribe({
        next:(res)=>{
          this.productsList = res.data
        }
      })
  }

  ngOnDestroy(): void {
    this.getAllProductsSub.unsubscribe()
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
