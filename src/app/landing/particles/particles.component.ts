import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-particles',
  templateUrl: './particles.component.html',
  styleUrls: ['./particles.component.css']
})
export class ParticlesComponent implements OnInit {
  public id = 'tsparticles'
  public particlesOptions = {
    background: {},
    fpsLimit: 60,
    interactivity: {
      detectsOn: 'canvas',
      events: {
        onClick: {
          enable: true,
          mode: 'push'
        },
        onHover: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 6,
          opacity: 0.5,
          size: 40
        },
        push: {
          quantity: 4
        },
        repulse: {
          distance: 200,
          duration: 0.4
        }
      }
    },
    particles: {
      color: {
        value: '#ffffff'
      },
      links: {
        color: '#ffffff',
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1
      },
      collisions: {
        enable: true
      },
      move: {
        direction: 'none',
        enable: true,
        outMode: 'bounce',
        random: false,
        speed: 2,
        straight: false
      },
      number: {
        density: {
          enable: true,
          value_area: 800
        },
        value: 80
      },
      opacity: {
        value: 0.1
      },
      shape: {
        type: 'circle'
      },
      size: {
        random: true,
        value: 4
      }
    },
    detectRetina: true
  }

  constructor() {}

  ngOnInit(): void {}

  particlesLoaded(container: any): void {
    console.log(container)
  }

  particlesInit(main: any): void {
    console.log(main)
  }
}
