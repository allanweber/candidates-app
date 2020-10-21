import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { VacancyView } from '../model/vacancy-view.model';

@Injectable({
  providedIn: 'root',
})
export class VacancyViewService {
  private serverUrl = `${environment.candidatesCareer}/candidate-application`;

  constructor(private http: HttpClient) {}

  getVacancy(applicationId: string): Observable<VacancyView> {
    return this.http.get<VacancyView>(
      `${this.serverUrl}/${applicationId}/vacancy`
    );
  }
}
