import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BrandsService } from '../../core/services/brands.service';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.scss']
})
export class BrandDetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _BrandsService = inject(BrandsService);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  brandDetails: any = null;
  brandProducts: any[] = [];

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadBrandDetails(id);
        this.loadBrandProducts(id);
      }
    });
  }

  loadBrandDetails(id: string): void {
    this._BrandsService.getSpecificBrand(id).subscribe({
      next: (res) => {
        this.brandDetails = res.data;
      }
    });
  }

  loadBrandProducts(id: string): void {
    this._ProductsService.getProductsByBrand(id).subscribe({
      next: (res) => {
        this.brandProducts = res.data;
      }
    });
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
