import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  url="https://localhost:7029/WeatherForecast"
  constructor(private http:HttpClient) { }

  get(){
    return this.http.get(this.url)
  }
  // get() {
  //   const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  //   return this.http.get('/WeatherForecast', { headers });
  // }
  
}
