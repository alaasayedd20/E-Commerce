import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit, OnDestroy {
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _NgxSpinnerService = inject(NgxSpinnerService);

  categoriesList: any[] = [];
  getAllCategoriesSub!: Subscription;

  ngOnInit(): void {
    this._NgxSpinnerService.show();
    this.getAllCategoriesSub = this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesList = res.data;
        this._NgxSpinnerService.hide();
      },
      error: () => {
        this._NgxSpinnerService.hide();
      },
    });
  }

  ngOnDestroy(): void {
    if (this.getAllCategoriesSub) {
      this.getAllCategoriesSub.unsubscribe();
    }
  }
}
