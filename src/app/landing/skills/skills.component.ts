import { Component, OnInit } from '@angular/core';
import { SkillInterface } from './skills.interface';
import dataSkill from 'src/assets/data/skills.json';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  public skills: Array<SkillInterface>;
  constructor() {}
  ngOnInit(): void {
    this.initSkills();
  }
  private initSkills() {
    const arrayTitleSkills: Array<string> = dataSkill;
    this.skills = [];

    arrayTitleSkills.forEach((titleSkill) =>
      this.skills.push(this.setSkill(titleSkill))
    );
  }

  private setSkill(titleSkill: string): SkillInterface {
    let title: string =
      titleSkill.charAt(0).toUpperCase() + titleSkill.slice(1);
    const index: string = titleSkill.toLowerCase().split(' ').join('_');

    const exceptions = {
      Jquery: 'jQuery',
      Postgresql: 'PostgreSQL',
      Microservice: 'skills.microservice'
    };

    if (exceptions[title]) title = exceptions[title];

    return {
      title,
      img: `assets/img/skills/${index}.svg`,
      description: `skills.info_${index}`
    };
  }
}
