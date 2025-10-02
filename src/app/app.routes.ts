import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [logedGuard],
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./components/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/register/register.component').then(
            (m) => m.RegisterComponent
          ),
      },
      {
        path: 'forget',
        loadComponent: () =>
          import('./components/forgetpassword/forgetpassword.component').then(
            (m) => m.ForgetpasswordComponent
          ),
      },
    ],
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layouts/blank-layout/blank-layout.component').then(
        (m) => m.BlankLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./components/products/products.component').then(
            (m) => m.ProductsComponent
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./components/cart/cart.component').then(
            (m) => m.CartComponent
          ),
      },

      {
        path: 'brands/:id',
        loadComponent: () =>
          import('./components/brand-details/brand-details.component').then(
            (m) => m.BrandDetailsComponent
          ),
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./components/brands/brands.component').then(
            (m) => m.BrandsComponent
          ),
      },
      {
        path: 'categories/:id',
        loadComponent: () =>
          import('./components/category-details/category-details.component')
            .then(m => m.CategoryDetailsComponent)
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./components/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
      },


      {
        path: 'details/:id',
        loadComponent: () =>
          import('./components/details/details.component').then(
            (m) => m.DetailsComponent
          ),
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./components/allorders/allorders.component').then(
            (m) => m.AllordersComponent
          ),
      },
      {
        path: 'orders/:id',
        loadComponent: () =>
          import('./components/orders/orders.component').then(
            (m) => m.OrdersComponent
          ),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/notfound/notfound.component').then(
        (m) => m.NotfoundComponent
      ),
  },
];
