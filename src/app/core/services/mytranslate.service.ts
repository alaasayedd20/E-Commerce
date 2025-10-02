import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MytranslateService {
  private readonly _TranslateService = inject(TranslateService)
  constructor() {
    let savedLang = localStorage.getItem('lang');
    this._TranslateService.setDefaultLang('en');
    this._TranslateService.use(savedLang!)
    this.changeDirection()
  }


  changeDirection():void{
    let savedLang = localStorage.getItem('lang');
    if(savedLang === 'en'){
      document.documentElement.dir = 'ltr'
    }
    else if(savedLang === 'ar'){
      document.documentElement.dir = 'rtl'
    }
  }

}
