import { Component, OnInit } from '@angular/core';
import { workExperienceTimelineInterface } from './about.interface';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public workExperienceTimeline: Array<workExperienceTimelineInterface>;
  constructor() {
    this.initWorkExperienceTimeline();
  }

  ngOnInit(): void {}

  initWorkExperienceTimeline() {
    this.workExperienceTimeline = [
      {
        img: 'assets/img/about/coposa.jpg',
        init: '06/2018',
        end: '11/2018',
        company: 'Consorcio Oleaginoso Portuguesa, S.A. COPOSA',
        country: 'Venezuela',
        job_title: 'about.junior_system_analyst',
        full_time: true
      },
      {
        img: 'assets/img/about/coposa.jpg',
        init: '11/2018',
        end: '02/2022',
        company: 'Consorcio Oleaginoso Portuguesa, S.A. COPOSA',
        country: 'Venezuela',
        job_title: 'about.senior_programmer_analyst',
        full_time: true
      },
      {
        img: 'assets/img/about/789.jpg',
        init: '06/2020',
        end: '09/2020',
        company: '789.mx',
        country: 'Mexico',
        job_title: 'about.full_stack_laravel_developer',
        full_time: true,
        remote: true
      },
      {
        img: 'assets/img/about/sapviremoto.png',
        init: '08/2020',
        end: '12/2020',
        company: 'Sapvi Remoto',
        country: 'Venezuela',
        job_title: 'about.full_stack_mean_ionic_developer',
        full_time: true,
        remote: true
      },
      {
        img: 'assets/img/about/hellomundo.jpg',
        init: '11/2020',
        end: '03/2021',
        company: 'Hello Mundo Chile',
        country: 'Chile',
        job_title: 'about.full_stack_mean_ionic_developer',
        full_time: true,
        remote: true
      },
      {
        img: 'assets/img/about/cronapis.png',
        init: '03/2021',
        end: '06/2021',
        company: 'Cronapis',
        country: 'Panamá',
        job_title: 'about.laravel_backend_developer',
        full_time: true,
        remote: true
      },
      {
        img: 'assets/img/about/cronapis.png',
        init: '06/2021',
        end: '09/2021',
        company: 'Cronapis',
        country: 'Panamá',
        job_title: 'about.teach_lead',
        full_time: true,
        remote: true
      }
    ];
  }
}
