import { Component, OnInit } from '@angular/core';
import { workExperienceTimelineInterface } from './about.interface';
import dataAbout from 'src/assets/data/about.json';

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
    this.workExperienceTimeline = dataAbout;
  }
}
