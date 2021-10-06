import { Component, OnInit } from '@angular/core';
import { LangService } from 'src/app/services/lang.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private langService: LangService) {}

  ngOnInit(): void {}

  public toggleLanguage() {
    this.langService.toggleTranslate();
  }
}
