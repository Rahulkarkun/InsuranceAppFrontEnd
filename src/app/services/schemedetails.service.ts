import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SchemeDetails } from '../models/schemedetails';

@Injectable({
  providedIn: 'root'
})
export class SchemedetailsService {
  private apiUrl = 'https://localhost:7029/api'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getAllSchemeDetails(): Observable<SchemeDetails[]> {
    return this.http.get<SchemeDetails[]>(`${this.apiUrl}/SchemeDetails/`);
  }

  getSchemeDetailsById(detailsId: number): Observable<SchemeDetails> {
    return this.http.get<SchemeDetails>(`${this.apiUrl}/SchemeDetails/${detailsId}`);
  }

  addSchemeDetails(detail: SchemeDetails): Observable<SchemeDetails> {
    return this.http.post<SchemeDetails>(`${this.apiUrl}/SchemeDetails`, detail);
  }

  updateSchemeDetails(updatedSchemeDetails: SchemeDetails): Observable<SchemeDetails> {
    return this.http.put<SchemeDetails>(`${this.apiUrl}/SchemeDetails/`, updatedSchemeDetails);
  }

  deleteSchemeDetails(detailsId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/SchemeDetails/${detailsId}`);
  }
}
