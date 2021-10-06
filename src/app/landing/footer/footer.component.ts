import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  public urlWhatsApp = '';
  private phoneNumber = '584143500985';

  constructor() {
    this.urlWhatsApp = `https://wa.me/${this.phoneNumber}?text=Buen%20día%20`;
  }

  ngOnInit(): void {}
}
