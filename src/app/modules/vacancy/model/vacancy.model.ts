import { Skill } from '../../../shared/model/skill.model';
export class Vacancy {
  id: string;
  name: string;
  description: string;
  skills: Skill[];
  remote: boolean;
  location: string;
}
