import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InsuranceScheme } from '../models/insuranceScheme';

@Injectable({
  providedIn: 'root'
})
export class InsuranceSchemeService {
  private apiUrl = 'https://localhost:7029/api'; 

  constructor(private http: HttpClient) {}

  getAllInsuranceScheme(): Observable<InsuranceScheme[]> {
    return this.http.get<InsuranceScheme[]>(`${this.apiUrl}/InsuranceScheme/`);
  }

  getInsuranceSchemeById(schemeId: number): Observable<InsuranceScheme> {
    return this.http.get<InsuranceScheme>(`${this.apiUrl}/InsuranceScheme/${schemeId}`);
  }

  addInsuranceScheme(scheme: InsuranceScheme): Observable<InsuranceScheme> {
    return this.http.post<InsuranceScheme>(`${this.apiUrl}/InsuranceScheme`, scheme);
  }

  updateInsuranceScheme(updatedInsuranceScheme: InsuranceScheme): Observable<InsuranceScheme> {
    return this.http.put<InsuranceScheme>(`${this.apiUrl}/InsuranceScheme/`, updatedInsuranceScheme);
  }

  deleteInsuranceScheme(schemeId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/InsuranceScheme/${schemeId}`);
  }
}
