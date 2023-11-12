import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CVComponent implements OnInit {
  public animateBtn: Boolean = false;
  public id = 'tsparticles';
  public particlesOptions = {
    fpsLimit: 60,
    particles: {
      color: {
        value: "#000"
      },
      links: {
        enable: true,
        color: "#000"
      },
      move: {
        enable: true
      }
    }
  };

  constructor() {}

  ngOnInit(): void {}

  particlesLoaded(container: any): void {}

  particlesInit(main: any): void {}

  public addAnimation() {
    this.animateBtn = true;
  }

  public removeAnimation() {
    this.animateBtn = false;
  }
}
