import { Component, OnInit } from '@angular/core';

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
    this.portfolios = [
      {
        title: 'Tienda Limon',
        descrip: 'Ecommerce realizado con el stack MEAN',
        url: 'https://www.youtube.com/watch?v=BgfcToAjfdc',
        portada: 'assets/img/portfolio/1.jpg',
        preview: [
          {
            url: 'assets/img/portfolio/1.jpg',
            type: 'img'
          },
          {
            url: 'https://www.youtube.com/embed/BgfcToAjfdc',
            type: 'video-youtbe'
          }
        ]
      },
      {
        title: 'Tienda Limon',
        descrip: 'Ecommerce realizado con el stack MEAN',
        url: 'https://www.youtube.com/watch?v=BgfcToAjfdc',
        portada: 'assets/img/portfolio/1.jpg',
        preview: [
          {
            url: 'assets/img/portfolio/1.jpg',
            type: 'img'
          },
          {
            url: 'https://www.youtube.com/embed/BgfcToAjfdc',
            type: 'video-youtbe'
          }
        ]
      },
      {
        title: 'Tienda Limon',
        descrip: 'Ecommerce realizado con el stack MEAN',
        url: 'https://www.youtube.com/watch?v=BgfcToAjfdc',
        portada: 'assets/img/portfolio/1.jpg',
        preview: [
          {
            url: 'assets/img/portfolio/1.jpg',
            type: 'img'
          },
          {
            url: 'https://www.youtube.com/embed/BgfcToAjfdc',
            type: 'video-youtbe'
          }
        ]
      }
    ];
  }

  public openModal(id: number) {
    this.dataModal = this.portfolios[id];

    console.log(this.dataModal);
  }
}
