// src/app/components/brands/brands.component.ts
import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone:true,
  imports:[RouterLink],
  templateUrl: './brands.component.html'
})
export class BrandsComponent implements OnInit {
  brandsList: any[] = [];

  constructor(private _BrandsService: BrandsService) {}

  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brandsList = res.data;
      }
    });
  }
}
