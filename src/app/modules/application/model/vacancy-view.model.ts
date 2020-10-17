import { Skill } from '../../../shared/model/skill.model';
import { Salary } from './../../../shared/model/salary.model';
export class VacancyView {
  name: string;
  description: string;
  skills: Skill[];
  remote: boolean;
  location: string;
  salary: Salary;
}
