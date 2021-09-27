import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { LandingRoutingModule } from './landing-routing.module'
import { NavbarComponent } from './navbar/navbar.component'
import { LandingComponent } from './landing.component'
import { HeaderComponent } from './header/header.component'
import { ServiceComponent } from './service/service.component'
import { PortafolioComponent } from './portafolio/portafolio.component'
import { NgParticlesModule } from 'ng-particles';
import { ParticlesComponent } from './particles/particles.component'

@NgModule({
  declarations: [
    NavbarComponent,
    LandingComponent,
    HeaderComponent,
    ServiceComponent,
    PortafolioComponent,
    ParticlesComponent
  ],
  imports: [CommonModule, LandingRoutingModule, NgParticlesModule]
})
export class LandingModule {}
