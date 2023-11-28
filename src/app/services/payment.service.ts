import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../models/payment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'https://localhost:7029/api'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/Payment/`);
  }

  getPaymentById(paymentId: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/Payment/${paymentId}`);
  }

  addPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${this.apiUrl}/Payment`, payment);
  }

  updatePayment(updatedPayment: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${this.apiUrl}/Payment/put`, updatedPayment);
  }

  deletePayment(paymentId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Payment/${paymentId}`);
  }

}
