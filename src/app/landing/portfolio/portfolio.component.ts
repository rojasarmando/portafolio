import { Component, OnInit } from '@angular/core';
import dataPortfolio from 'src/assets/data/portfolio.json';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  public portfolios: Array<any> = [];
  public dataModal: any = {};
  constructor() {}

  ngOnInit(): void {
    this.initPortfolio();
  }

  initPortfolio(): void {
    this.portfolios = dataPortfolio;
  }

  public openModal(id: number) {
    this.dataModal = this.portfolios[id];
  }
}
