import { Skill } from '../../../shared/model/skill.model';
import { Salary } from './../../../shared/model/salary.model';
export class Vacancy {
  id: string;
  name: string;
  description: string;
  skills: Skill[];
  remote: boolean;
  location: string;
  salary: Salary;
}
