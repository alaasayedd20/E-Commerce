import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent implements OnInit, OnDestroy {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _NgxSpinnerService = inject(NgxSpinnerService);
  private readonly _Route = inject(ActivatedRoute);

  categoryId!: string;
  products: IProduct[] = [];
  getProductsSub!: Subscription;

  ngOnInit(): void {
    this._Route.paramMap.subscribe(params => {
      this.categoryId = params.get('id')!;
      this.fetchProducts();
    });
  }

  fetchProducts() {
    this._NgxSpinnerService.show();
    this.getProductsSub = this._ProductsService.getProductsByCategory(this.categoryId).subscribe({
      next: (res) => {
        this.products = res.data;
        this._NgxSpinnerService.hide();
      },
      error: () => {
        this._NgxSpinnerService.hide();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.getProductsSub) this.getProductsSub.unsubscribe();
  }

  addCart(id: string) {
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        this._CartService.cartNumber.set(res.numOfCartItems);
        this._ToastrService.success(res.message, 'FreshCart');
      }
    });
  }
}
