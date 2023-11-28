import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url="https://localhost:7029/api/User/login"

  constructor(private http:HttpClient) { }
  login(data:any){
    return this.http.post(this.url,data,{observe:'response'});
  }
}
