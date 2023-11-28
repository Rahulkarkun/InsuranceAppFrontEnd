import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemporaryDataService {

  private id= new BehaviorSubject(0);
  private role:string='some';
  private loginId:number=0;
  getId= this.id.asObservable();
  // getRole= this.role.asObservable();
  getRole():string{
    return this.role
  }
  // getLoginId():number{
  //   return this.loginId
  // }

  constructor() { }
  // setLoginId(loginIdNumber:number){
  //   this.loginId=loginIdNumber
  //   console.log(this.loginId)
  // }
  // setId(idNumber:number){
  //   this.id.next(idNumber)
  //   //this.id=idNumber
  //   console.log(this.id)
  // }
  setRole(userRole:string){
    // debugger
    this.role=userRole
    console.log(this.role)
    
  }
}