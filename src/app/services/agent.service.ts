// // src/app/agent.service.ts

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Agent } from "../models/agent";

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private apiUrl = 'https://localhost:7029/api'; // Replace with your API URL
  private id:number=0;

  constructor(private http: HttpClient) {}

  getAllAgents(): Observable<Agent[]> {
    return this.http.get<Agent[]>(`${this.apiUrl}/Agent/get`);
  }

  getAgentById(agentId: number): Observable<Agent> {
    return this.http.get<Agent>(`${this.apiUrl}/Agent/${agentId}`);
  }

  addAgent(agent: Agent): Observable<Agent> {
    return this.http.post<Agent>(`${this.apiUrl}/Agent`, agent);
  }

  updateAgent(updatedAgent: Agent): Observable<Agent> {
    return this.http.put<Agent>(`${this.apiUrl}/Agent/`, updatedAgent);
  }

  deleteAgent(agentId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Agent/${agentId}`);
  }

  getByUserId(userId: number): Observable<Agent> {
    return this.http.get<Agent>(`${this.apiUrl}/Agent/getByUserId?id=${userId}`);
 }

  changePasswordAgent(agent: Agent): Observable<Agent> {
    return this.http.post<Agent>(`${this.apiUrl}/Agent/ChangePassword`, agent);
  }

  changeUsernameAgent(agent: Agent): Observable<Agent> {
    return this.http.post<Agent>(`${this.apiUrl}/Agent/ChangeUsername`, agent);
  }

  getId(){
    return this.id;
  }

  setId(agentId:number){
    this.id=agentId;
  }
}

