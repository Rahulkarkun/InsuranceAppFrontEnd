// // src/app/claim.service.ts

// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
// import { Claim } from '../models/claim';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class ClaimService {
//   private apiUrl = 'https://localhost:7029/api'; 

//   constructor(private http: HttpClient) {}

//   getAllClaims(): Observable<Claim[]> {
//     return this.http.get<Claim[]>(`${this.apiUrl}/Claim/`);
//   }

//   getClaimById(claimId: number): Observable<Claim> {
//     return this.http.get<Claim>(`${this.apiUrl}/Claim/${claimId}`);
//   }

//   addClaim(claim: Claim): Observable<Claim> {
//     return this.http.post<Claim>(`${this.apiUrl}/Claim`, claim);
//   }

//   updateClaim(updatedClaim: Claim): Observable<Claim> {
//     return this.http.put<Claim>(`${this.apiUrl}/Claim/put`, updatedClaim);
//   }

//   deleteClaim(claimId: number): Observable<any> {
//     return this.http.delete<any>(`${this.apiUrl}/Claim/${claimId}`);
//   }
//  }
// src/app/claim.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Claim } from '../models/claim';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private apiUrl = 'https://localhost:7029/api'; 
  private id:number=0;
  constructor(private http: HttpClient) {}

  getAllClaims(): Observable<Claim[]> {
    return this.http.get<Claim[]>(`${this.apiUrl}/Claim/`);
  }

  getClaimById(claimId: number): Observable<Claim> {
    return this.http.get<Claim>(`${this.apiUrl}/Claim/${claimId}`);
  }

  addClaim(claim: Claim): Observable<Claim> {
    return this.http.post<Claim>(`${this.apiUrl}/Claim`, claim);
  }

  updateClaim(updatedClaim: Claim): Observable<Claim> {
    return this.http.put<Claim>(`${this.apiUrl}/Claim`, updatedClaim);
  }

  deleteClaim(claimId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Claim/${claimId}`);
  }
  getId(){
    return this.id
  }
  setId(claimId:number){
    this.id=claimId
  }
 }