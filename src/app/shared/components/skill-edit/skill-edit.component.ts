import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Skill } from './../../model/skill.model';

@Component({
  selector: 'app-skill-edit',
  templateUrl: './skill-edit.component.html',
  styleUrls: ['./skill-edit.component.scss'],
})
export class SkillEditComponent implements OnInit {
  @Input() skill: Skill;
  @Input() editable = true;

  @Output() removed: EventEmitter<Skill> = new EventEmitter<Skill>();
  @Output() changed: EventEmitter<Skill> = new EventEmitter<Skill>();

  constructor() {}

  ngOnInit(): void {}

  getYearsText(): string {
    return `${this.skill.years} ano${this.skill.years === 1 ? '' : 's'}`;
  }

  change(year: number): void {
    this.skill.years += year;
    if (this.skill.years < 0) {
      this.skill.years = 0;
    }
    if (this.skill.years > 99) {
      this.skill.years = 99;
    }
    this.changed.emit(this.skill);
  }

  remove(): void {
    this.removed.emit(this.skill);
  }

  isEditable(): boolean {
    return this.editable === true;
  }
}
