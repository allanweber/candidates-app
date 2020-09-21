import { User } from './../../shared/model/user.model';
import { Observable } from 'rxjs';
import { Registration } from './../model/registration.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
