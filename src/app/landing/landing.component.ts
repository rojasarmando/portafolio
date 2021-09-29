import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  public activeLanguage = 'en'

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(this.activeLanguage)
  }
  ngOnInit() {}
  public changeLanguage(lang) {
    this.activeLanguage = lang
    this.translate.use(lang)
  }
}
