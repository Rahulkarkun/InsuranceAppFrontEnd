// document.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from '../models/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = 'https://localhost:7029/api'; 

  constructor(private http: HttpClient) {}

  token = localStorage.getItem('token');

  headers = new HttpHeaders({
   'Content-Type': 'application/json',
   'Authorization': `Bearer ${this.token}`
 });

  options = { headers: this.headers };

  // updateDocumentStatus( document: Document): Observable<any> {
  //   // Implement your API endpoint to update only the 'isActive' field
  //   return this.http.put<any>(`${this.apiUrl}/document`, document, this.options);
  // }
  // getDocumentById(documentId: number): Observable<any> {
  //   // Implement your API endpoint to get document details by ID
  //   return this.http.get<any>(`${this.apiUrl}/document/${documentId}`,this.options);
  // }


  // getDocumentById(id: number): Observable<Document> {
  //   return this.http.get<Document>(`${this.apiUrl}/document/id=${id}`, this.options);
  // }

  getDocumentById(id: number): Observable<Document> {
    return this.http.get<Document>(`${this.apiUrl}/Document?id=${id}`, this.options);
  }

  getAllDocuments(): Observable<Document[]> {
    const url = `${this.apiUrl}/Document/get`;
    return this.http.get<Document[]>(url, this.options);
  }

  
  updateDocumentStatus( documentId: any): Observable<any> {
    // Implement your API endpoint to update only the 'isActive' field
    return this.http.put<any>(`${this.apiUrl}/Document/${documentId}`, this.options);
  }
  
  uploadFile(formData: FormData) {
    return this.http.post<any>(`${this.apiUrl}/Document/upload`, formData);
  }
}