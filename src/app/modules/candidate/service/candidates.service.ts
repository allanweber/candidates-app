import { ResumeResponse } from './../../../shared/model/resume-response.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Candidate } from '../model/candidate.mode';

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  private serverUrl = environment.candidatesCareer;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${this.serverUrl}/candidates`);
  }

  get(candidateId: string): Observable<Candidate> {
    return this.http.get<Candidate>(
      `${this.serverUrl}/candidates/${candidateId}`
    );
  }

  add(candidate: Candidate): Observable<Candidate> {
    return this.http.post<Candidate>(`${this.serverUrl}/candidates`, candidate);
  }

  update(candidate: Candidate): Observable<Candidate> {
    return this.http.put<Candidate>(
      `${this.serverUrl}/candidates/${candidate.id}`,
      candidate
    );
  }

  addGitSocialEntry(
    candidateId: string,
    socialNetwork: string
  ): Observable<any> {
    return this.http.put<any>(
      `${this.serverUrl}/candidates/${candidateId}/social-entry`,
      [socialNetwork]
    );
  }

  getImageBase64(candidateId: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain; charset=utf-8'
    );
    return this.http.get<any>(
      `${this.serverUrl}/candidates/${candidateId}/image`,
      { headers, responseType: 'text' as 'json' }
    );
  }

  getResumeInfo(candidateId: string): Observable<ResumeResponse> {
    return this.http.get<ResumeResponse>(
      `${this.serverUrl}/candidates/${candidateId}/resume-info`
    );
  }

  getResume(candidateId: string): Observable<Blob> {
    return this.http.get<Blob>(
      `${this.serverUrl}/candidates/${candidateId}/resume`,
      { responseType: 'blob' as 'json' }
    );
  }

  uploadResume(candidateId: string, file: File): Observable<ResumeResponse> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<ResumeResponse>(
      `${this.serverUrl}/candidates/${candidateId}/resume-upload`,
      formData
    );
  }
}
