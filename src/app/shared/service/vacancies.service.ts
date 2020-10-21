import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Vacancy } from './../model/vacancy.model';

@Injectable({
  providedIn: 'root',
})
export class VacanciesService {
  private serverUrl = environment.candidatesCareer;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(`${this.serverUrl}/vacancies`);
  }

  get(id: string): Observable<Vacancy> {
    return this.http.get<Vacancy>(`${this.serverUrl}/vacancies/${id}`);
  }

  save(vacancy: Vacancy): Observable<Vacancy> {
    if (vacancy.id) {
      return this.update(vacancy);
    } else {
      return this.insert(vacancy);
    }
  }

  private insert(vacancy: Vacancy): Observable<Vacancy> {
    return this.http.post<Vacancy>(`${this.serverUrl}/vacancies`, vacancy);
  }

  private update(vacancy: Vacancy): Observable<Vacancy> {
    return this.http.put<Vacancy>(
      `${this.serverUrl}/vacancies/${vacancy.id}`,
      vacancy
    );
  }
}
