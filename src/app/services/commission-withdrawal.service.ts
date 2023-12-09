import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { commissionwith}

@Injectable({
  providedIn: 'root'
})
export class CommissionWithdrawalService {
  private apiUrl = 'https://localhost:7029/api'; // Replace with your API URL
  private id:number=0;

  constructor(private http: HttpClient) {}

  getCommissonWithdrawal():Observable<any>{
    return this.http.get(this.apiUrl+"/CommissionWithdrawal")
  }
 
  getCommissionWithdrawalById(commissionWithdrawalId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/CommissionWithdrawal/${commissionWithdrawalId}`);
  }

  addCommissionWithdrawal(data:any){
    return this.http.post(this.apiUrl+"/CommissionWithdrawal",data)
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
