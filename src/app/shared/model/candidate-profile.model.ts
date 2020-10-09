import { CandidateExperience } from './candidate-experience.model';
export class CandidateProfile {
  name: string;
  email: string;
  location: string;
  bio: string;
  experiences: CandidateExperience[];
}
