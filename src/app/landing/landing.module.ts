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

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LangService } from '../services/lang.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { FormSpreeService } from '../services/form-spree.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
  providers:[
    HttpClientModule,
    LangService,
    FormSpreeService
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    LandingRoutingModule,
    NgParticlesModule,
    NgxTypedJsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
    
    
  ]
})
export class LandingModule {}
