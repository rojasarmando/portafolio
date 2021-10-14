import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LangService {
  private activeLanguage = environment.LANG;

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(this.activeLanguage);
  }
  toggleTranslate() {
    this.activeLanguage = this.activeLanguage == 'es' ? 'en' : 'es';
    this.translate.use(this.activeLanguage);
  }

  getTranslate(key: string) {
    return this.translate.instant(key);
  }
}
