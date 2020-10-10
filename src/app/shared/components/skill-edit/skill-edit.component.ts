import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Skill } from './../../model/skill.model';

@Component({
  selector: 'app-skill-edit',
  templateUrl: './skill-edit.component.html',
  styleUrls: ['./skill-edit.component.scss'],
})
export class SkillEditComponent implements OnInit {
  @Input() skills: Skill[];
  @Input() editable = true;
  @Input() removable = true;
  @Input() yearsVisible = true;
  @Input() addable = true;
  @Input() tagSize = 'are-medium';

  @Output() changed: EventEmitter<Skill[]> = new EventEmitter<Skill[]>();

  constructor() {}

  ngOnInit(): void {}

  addSkill(skillInput: HTMLInputElement): void {
    const skillName = skillInput.value;
    if (!skillName || skillName.trim() === '') {
      return;
    }

    if (!this.skills) {
      this.skills = [];
    }

    let skillValues = skillName.split(/,|;/).map((x) => x.trim());
    skillValues = skillValues.filter(
      (val) => !this.skills.map((skill) => skill.name).includes(val)
    );

    skillValues.forEach((skill) => this.skills.push({ name: skill, years: 0 }));

    this.changed.emit(this.skills);
    skillInput.value = '';
    skillInput.focus();
  }

  getYearsText(skill: Skill): string {
    return `- ${skill.years > 0 && skill.years < 10 ? '0' : ''}${
      skill.years
    } ano${skill.years === 1 ? '' : 's'}`;
  }

  change(skill: Skill, year: number): void {
    skill.years += year;
    if (skill.years < 0) {
      skill.years = 0;
    }
    if (skill.years > 99) {
      skill.years = 99;
    }
    const skillIndex = this.skills.indexOf(skill);
    if (skillIndex > -1) {
      this.skills[skillIndex] = skill;
    }
    this.changed.emit(this.skills);
  }

  remove(skill: Skill): void {
    const skillIndex = this.skills.indexOf(skill);
    if (skillIndex > -1) {
      this.skills.splice(skillIndex, 1);
    }
    this.changed.emit(this.skills);
  }

  get isEditable(): boolean {
    return this.editable === true && this.showYears;
  }

  get isRemovable(): boolean {
    return this.removable === true;
  }

  get showYears(): boolean {
    return this.yearsVisible === true;
  }

  get isAddable(): boolean {
    return this.addable === true;
  }
}
