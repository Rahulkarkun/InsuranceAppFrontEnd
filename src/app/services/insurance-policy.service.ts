import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InsurancePolicy } from '../models/InsurancePolicy';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InsurancePolicyService {
  private apiUrl = 'https://localhost:7029/api'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getAllInsurancePolicy(): Observable<InsurancePolicy[]> {
    return this.http.get<InsurancePolicy[]>(`${this.apiUrl}/InsurancePolicy`);
  }

  getInsurancePolicyById(id: number): Observable<InsurancePolicy> {
    return this.http.get<InsurancePolicy>(`${this.apiUrl}/InsurancePolicy/${id}`);
  }

  addInsurancePolicy(insurancePolicy: InsurancePolicy): Observable<InsurancePolicy> {
    return this.http.post<InsurancePolicy>(`${this.apiUrl}/InsurancePolicy`, insurancePolicy);
  }

  updateInsurancePolicy(updatedInsurancePolicy: InsurancePolicy): Observable<InsurancePolicy> {
    return this.http.put<InsurancePolicy>(`${this.apiUrl}/InsurancePolicy/put`, updatedInsurancePolicy);
  }

  deleteInsurancePolicy(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/InsurancePolicy/${id}`);
  }
}
