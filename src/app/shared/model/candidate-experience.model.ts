import { Skill } from './skill.model';
export class CandidateExperience {
  companyName: string;
  companyLocation: string;
  position: string;
  start: Date;
  end: Date;
  description: string;
  skills: Skill[];
}
