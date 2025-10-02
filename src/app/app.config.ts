import { NgxSpinnerConfig } from './../../node_modules/ngx-spinner/lib/config.d';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { headerInterceptor } from './core/interceptors/header.interceptor';
import { errorsInterceptor } from './core/interceptors/errors.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

 export function HttpLoaderFactory() {
   return new TranslateHttpLoader();
 }

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes, withViewTransitions()),
      provideClientHydration(),
       provideHttpClient(withFetch(),
        withInterceptors([headerInterceptor, errorsInterceptor, loadingInterceptor])),
         provideAnimations(),
          provideToastr(),
          importProvidersFrom(
            NgxSpinnerModule,
            TranslateModule.forRoot({
              loader:{
                provide:TranslateLoader,
                useFactory:HttpLoaderFactory,
                deps:[HttpClient]
              }
            })
          )
        ]
};
