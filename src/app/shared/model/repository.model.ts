export class Repository {
  name: string;
  description: string;
  fork: boolean;
  createdAt: Date;
  updatedAt: Date;
  cloneUrl: string;
  mainLanguage: string;
  languages: Language[];
  stars: number;
  watchers: number;
  commits: number;
  pulls: number;
  branches: number;
}

export class Language {
  name: string;
  size: number;
  proportion: number;
}
