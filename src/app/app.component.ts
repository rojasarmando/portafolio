import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LandingModule } from './landing/landing.module';
import { NgxSpinnerModule } from 'ngx-spinner';

import { NgxSpinnerService } from 'ngx-spinner';
import { NgwWowService } from 'ngx-wow';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    HttpClientModule,
    RouterOutlet , 
    LandingModule , 
    NgxSpinnerModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rojasarmando';

  constructor(
    private _wowService: NgwWowService,
    private _spinnerService: NgxSpinnerService
  ) {
    this._wowService.init();
  }

  ngOnInit() {
    this._spinnerService.hide();
  }
}

