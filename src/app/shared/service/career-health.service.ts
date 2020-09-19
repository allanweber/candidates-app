import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CareerHealthService {

  private serverUrl = environment.candidatesCareer;

  constructor(private http: HttpClient) { }

  getHealth(): Observable<any> {
    return this.http.get<any>(`${this.serverUrl}/health`);
  }
}
