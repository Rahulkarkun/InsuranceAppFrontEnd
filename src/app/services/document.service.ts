// document.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from '../models/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = 'your_api_url'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  token = localStorage.getItem('token');

  headers = new HttpHeaders({
   'Content-Type': 'application/json',
   'Authorization': `Bearer ${this.token}`
 });

  options = { headers: this.headers };

  updateDocumentStatus( document: Document): Observable<any> {
    // Implement your API endpoint to update only the 'isActive' field
    return this.http.put<any>(`${this.apiUrl}/document`, document, this.options);
  }
  getDocumentById(documentId: number): Observable<any> {
    // Implement your API endpoint to get document details by ID
    return this.http.get<any>(`${this.apiUrl}/documents/${documentId}`,this.options);
  }

  getAllDocuments(): Observable<Document[]> {
    const url = `${this.apiUrl}/documents`;
    return this.http.get<Document[]>(url, this.options);
  }
}
