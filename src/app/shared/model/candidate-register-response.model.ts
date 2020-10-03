import { CandidateRegisterVacancy } from './candidate-register-vacancy.model';

export class CandidateRegisterResponse {
  status: string;
  error: string;
  vacancy: CandidateRegisterVacancy;
}
