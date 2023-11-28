// // src/app/agent.service.ts

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/User";
import { Admin } from "../models/Admin";
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'https://localhost:7029/api'; // Replace with your API URL
  private id:number=0;

  constructor(private http: HttpClient) {}

  getAllAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.apiUrl}/Admin/get`);
  }

  getAdminById(adminId: number): Observable<Admin> {
    return this.http.get<Admin>(`${this.apiUrl}/Admin/${adminId}`);
  }

  addAdmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(`${this.apiUrl}/Admin`, admin);
  }

  updateAdmin(updatedAdmin: Admin): Observable<Admin> {
    // this.http.put<User>(`${this.apiUrl}/User/`, updatedUser);
    return this.http.put<Admin>(`${this.apiUrl}/Admin`, updatedAdmin);
  }

  deleteAdmin(adminId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Admin/${adminId}`);
  }

  getByuserId(userId: number): Observable<Admin> {
    // console.log(this.http.get<Admin>(`${this.apiUrl}/Admin/getByUserId/${userId}`))
    return this.http.get<Admin>(`${this.apiUrl}/Admin/getByUserId?id=${userId}`);
    
  }

  changePasswordAdmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(`${this.apiUrl}/Admin/ChangePassword`, admin);
  }

  changeUsernameAdmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(`${this.apiUrl}/Admin/ChangeUsername`, admin);
  }

  getId(){
    return this.id;
  }

  setId(adminId:number){
    this.id=adminId;
  }
}

