import { Skill } from './skill.model';
import { Salary } from './salary.model';
export class Vacancy {
  id: string;
  name: string;
  description: string;
  skills: Skill[];
  remote: boolean;
  location: string;
  salary: Salary;
}
