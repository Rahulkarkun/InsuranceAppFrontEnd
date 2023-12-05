import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Query } from '../models/query';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  private apiUrl = 'https://localhost:7029/api'; // Replace with your API URL
  private id:number=0;
  constructor(private http: HttpClient) { }

  getAllQueries(): Observable<Query[]> {
    return this.http.get<Query[]>(`${this.apiUrl}/Query/`);
  }

  getQueryById(queryId: number): Observable<Query> {
    return this.http.get<Query>(`${this.apiUrl}/Query/${queryId}`);
  }

  addQuery(query: Query): Observable<Query> {
    return this.http.post<Query>(`${this.apiUrl}/Query`, query);
  }

  updateQuery(updatedQuery: Query): Observable<Query> {
    return this.http.put<Query>(`${this.apiUrl}/Query`, updatedQuery);
  }

  deleteQuery(queryId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Query/${queryId}`);
  }
  getId(){
    return this.id
  }
  setId(queryId:number){
    this.id=queryId
  }
}
