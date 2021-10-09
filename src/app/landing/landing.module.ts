import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingComponent } from './landing.component';
import { HeaderComponent } from './header/header.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { NgParticlesModule } from 'ng-particles';
import { ParticlesComponent } from './particles/particles.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { WorkComponent } from './work/work.component';
import { SkillsComponent } from './skills/skills.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxTypedJsModule } from 'ngx-typed-js';

@NgModule({
  declarations: [
    NavbarComponent,
    LandingComponent,
    HeaderComponent,
    PortfolioComponent,
    ParticlesComponent,
    FooterComponent,
    ContactComponent,
    AboutComponent,
    WorkComponent,
    SkillsComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    NgParticlesModule,
    TranslateModule,
    NgxTypedJsModule
  ]
})
export class LandingModule {}
