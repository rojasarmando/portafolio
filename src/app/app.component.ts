import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgwWowService } from 'ngx-wow';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
