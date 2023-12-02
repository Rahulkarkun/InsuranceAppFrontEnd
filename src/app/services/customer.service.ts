
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'https://localhost:7029/api'; 

  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/Customer/get`);
  }

  getCustomerById(customerId: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/Customer?Id=${customerId}`);
  }
  getByuserId(userId: number): Observable<Customer> {
    // console.log(this.http.get<Admin>(`${this.apiUrl}/Admin/getByUserId/${userId}`))
    return this.http.get<Customer>(`${this.apiUrl}/Customer/getByUserId?id=${userId}`);
    
  }
  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}/Customer`, customer);
  }

  updateCustomer(updatedCustomer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/Customer`, updatedCustomer);
  }

  deleteCustomer(customerId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Customer/${customerId}`);
  }
  getCustomersByAgentId(agentId: number): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/Customer/getByAgentId/${agentId}`);
  }
  changePasswordCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}/Customer/ChangePassword`, customer);
  }

  changeUsernameCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}/Customer/ChangeUsername`, customer);
  }
  
  // addUser(data:any){    return this.http.post(this.apiUrl+"/User/Register",data)}

  // findUser(username:string){
  //   return this.http.get(this.apiUrl+"/User/FindUser/"+username)
  // }
}