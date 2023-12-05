// document.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from '../models/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = 'https://localhost:7029/api'; // Replace with your API URL
  private id:number=0;

  constructor(private http: HttpClient) {}

//   token = localStorage.getItem('token');

//   headers = new HttpHeaders({
//    'Content-Type': 'application/json',
//    'Authorization': `Bearer ${this.token}`
//  });

  // options = { headers: this.headers };

  updateDocumentStatus( document: Document): Observable<Document> {
    // Implement your API endpoint to update only the 'isActive' field
    return this.http.put<Document>(`${this.apiUrl}/Document`, document);
  }
  getDocumentById(documentId: number): Observable<Document> {
    // Implement your API endpoint to get document details by ID
    return this.http.get<Document>(`${this.apiUrl}/Document?id=${documentId}`);
  }

  getAllDocuments(): Observable<Document[]> {
    // const url = `${this.apiUrl}/documents`;
    return this.http.get<Document[]>(`${this.apiUrl}/Document/get/`);
  }

  uploadFile(formData: FormData) {
    return this.http.post<any>(`${this.apiUrl}/Document/upload`, formData);
  }

  getId(){
    return this.id;
  }

  setId(documentId:number){
    this.id=documentId;
  }
}
