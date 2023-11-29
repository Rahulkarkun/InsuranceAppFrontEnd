import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://localhost:7029/api'; 
  private id:number=0;
  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/Employee/`);
  }

  getEmployeeById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/Employee/${employeeId}`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/Employee`, employee);
  }

  updateEmployee(updatedEmployee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/Employee`, updatedEmployee);
  }

  deleteEmployee(employeeId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Employee/${employeeId}`);
  }

  getByuserId(userId: number): Observable<Employee> {
    // console.log(this.http.get<Admin>(`${this.apiUrl}/Admin/getByUserId/${userId}`))
    return this.http.get<Employee>(`${this.apiUrl}/Employee/getByUserId?id=${userId}`);
    
  }

  getId(){
    return this.id
  }
  setId(claimId:number){
    this.id=claimId
  }
}
