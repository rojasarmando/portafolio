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
    this.initWorkExperienceTimeline()
  }

  ngOnInit(): void {
  }

  initWorkExperienceTimeline(){
    this.workExperienceTimeline = [
      {
        img : 'assets/img/about/coposa.jpg',
        init: '06/2018',
        end: '11/2018',
        company: 'COPOSA',
        country: "Venezuela",
        job_title: "about.junior_system_analyst",
        description: "about.description_1",
        full_time: true,
      },
      {
        img : 'assets/img/about/coposa.jpg',
        init: '11/2018',
        end: '02/2020',
        company: 'COPOSA',
        country: "Venezuela",
        job_title: "about.junior_system_analyst",
        description: "about.description_1"
      },
      {
        img : 'assets/img/about/1.jpg',
        init: '06/2018',
        end: '02/2020',
        company: 'COPOSA',
        country: "Venezuela",
        job_title: "about.junior_system_analyst",
        description: "about.description_1"
      }
    ];
  }

  /*
   <li>
        <div class="timeline-image">
          <img
            class="rounded-circle img-fluid"
            src="assets/img/about/1.jpg"
            alt="..."
          />
        </div>
        <div class="timeline-panel">
          <div class="timeline-heading">
            <h4>2009-2011</h4>
            <h4 class="subheading">Our Humble Beginnings</h4>
          </div>
          <div class="timeline-body">
            <p class="text-muted">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut
              voluptatum eius sapiente, totam reiciendis temporibus qui
              quibusdam, recusandae sit vero unde, sed, incidunt et ea quo
              dolore laudantium consectetur!
            </p>
          </div>
        </div>
      </li> */


}
