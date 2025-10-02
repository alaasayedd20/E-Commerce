import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { RouterLink } from "@angular/router";
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, TermtextPipe, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _NgxSpinnerService = inject(NgxSpinnerService);

  text: string = "";

  getAllProductsSub!: Subscription;
  productsList: IProduct[] = [];

  ngOnInit(): void {
    this._NgxSpinnerService.show();

    this.getAllProductsSub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.productsList = res.data;
        this._NgxSpinnerService.hide();
      },
      error: () => {
        this._NgxSpinnerService.hide();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.getAllProductsSub) {
      this.getAllProductsSub.unsubscribe();
    }
  }

  addCart(id: string) {
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        this._CartService.cartNumber.set(res.numOfCartItems);
        this._ToastrService.success(res.message, "FreshCart");
      }
    });
  }
}
