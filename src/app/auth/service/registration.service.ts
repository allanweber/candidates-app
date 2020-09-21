import { User } from './../../core/model/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Registration } from './../model/registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private serverUrl = environment.candidatesCareer;

  constructor(private http: HttpClient) { }

  register(registration: Registration): Observable<User> {
    return this.http.post<User>(`${this.serverUrl}/registration/signUp`, registration);
  }
}
