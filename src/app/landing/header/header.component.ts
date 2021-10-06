import { Component, OnInit } from '@angular/core';
import { LangService } from 'src/app/services/lang.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public animateBtn: Boolean = false;

  constructor(private langService: LangService) {}

  ngOnInit(): void {}

  public toggleLanguage() {
    this.langService.toggleTranslate();
    this.addAnimation();
  }

  public addAnimation() {
    this.animateBtn = false;
    setTimeout(() => {
      this.animateBtn = true;
    }, 100);
  }

  public removeAnimation() {
    this.animateBtn = false;
  }
}
