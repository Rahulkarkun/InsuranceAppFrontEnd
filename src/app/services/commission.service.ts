import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commission } from '../models/commission';

@Injectable({
  providedIn: 'root'
})
export class CommissionService {
  private apiUrl = 'https://localhost:7029/api'; // Replace with your API URL
  private id:number=0;

  constructor(private http: HttpClient) {}

  getAllCommissions(): Observable<Commission[]> {
    return this.http.get<Commission[]>(`${this.apiUrl}/Commission`);
  }

  getCommissionById(commissionId: number): Observable<Commission> {
    return this.http.get<Commission>(`${this.apiUrl}/Commission/${commissionId}`);
  }

  addCommission(commission: Commission): Observable<Commission> {
    return this.http.post<Commission>(`${this.apiUrl}/Commission`, commission);
  }

  updateCommission(updatedCommission: Commission): Observable<Commission> {
    return this.http.put<Commission>(`${this.apiUrl}/Commission`, updatedCommission);
  }

  deleteCommission(commissionId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Commission/${commissionId}`);
  }

//   getByUserId(userId: number): Observable<Agent> {
//     return this.http.get<Agent>(`${this.apiUrl}/Agent/getByUserId?id=${userId}`);
//  }

  // changePasswordAgent(agent: Agent): Observable<Agent> {
  //   return this.http.post<Agent>(`${this.apiUrl}/Agent/ChangePassword`, agent);
  // }

  // changeUsernameAgent(agent: Agent): Observable<Agent> {
  //   return this.http.post<Agent>(`${this.apiUrl}/Agent/ChangeUsername`, agent);
  // }

  getId(){
    return this.id;
  }

  setId(agentId:number){
    this.id=agentId;
  }
}
