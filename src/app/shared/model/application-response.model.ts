export class ApplicationResponse {
  status: string;
  error: string;
  statusText: string;
  sent: string;
  updated: string;
  vacancy: VacancyApplication;
  candidate: CandidateApplication;
}

export class CandidateApplication {
  id: string;
  name: string;
}

export class VacancyApplication {
  id: string;
  name: string;
}
