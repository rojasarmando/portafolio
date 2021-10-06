import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  private activeLanguage = 'es';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(this.activeLanguage);
  }
  public toggleTranslate() {
    this.activeLanguage = this.activeLanguage == 'es' ? 'en' : 'es';
    this.translate.use(this.activeLanguage);
  }
}
