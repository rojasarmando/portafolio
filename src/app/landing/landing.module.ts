import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingComponent } from './landing.component';
import { HeaderComponent } from './header/header.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { NgParticlesModule } from 'ng-particles';
import { CVComponent } from './cv/cv.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { SkillsComponent } from './skills/skills.component';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    NavbarComponent,
    LandingComponent,
    HeaderComponent,
    PortfolioComponent,
    CVComponent,
    FooterComponent,
    ContactComponent,
    AboutComponent,
    SkillsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    LandingRoutingModule,
    NgParticlesModule,
    NgxTypedJsModule,
    ReactiveFormsModule
    
  ]
})
export class LandingModule {}
