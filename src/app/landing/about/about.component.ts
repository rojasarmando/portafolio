import { Component, OnInit } from '@angular/core';
import { workExperienceTimelineInterface } from './about.interface';
import dataAbout from '../../../assets/data/about.json';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public workExperienceTimeline: Array<workExperienceTimelineInterface> = dataAbout;
  constructor() {
    this.initWorkExperienceTimeline();
  }

  ngOnInit(): void {}

  initWorkExperienceTimeline() {
    this.workExperienceTimeline = dataAbout;
  }
}
