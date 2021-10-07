import { Component, OnInit } from '@angular/core';
import { SkillInterface } from './skills.interface';

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
    this.skills = [
      {
        title: 'Laravel',
        img: 'assets/img/laravel.svg',
        description: 'verciones 5.3, 5.8, 7 y 8'
      },
      {
        title: 'Laravel',
        img: 'assets/img/laravel.svg'
      },
      {
        title: 'Laravel',
        img: 'assets/img/laravel.svg'
      },
      {
        title: 'Laravel',
        img: 'assets/img/laravel.svg'
      }
    ];
  }
}
