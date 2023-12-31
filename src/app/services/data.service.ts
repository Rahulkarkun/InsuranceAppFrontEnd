import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _userName:string="";
  private _userId:number=0;
  private _loginId:number=0;
  private _roleName:string="";
  set userName(value:string){
    this._userName=value;
  }
  get userName():string{
    return this._userName
  }

  set roleName(value:string){
    this._roleName=value;
  }
  get roleName():string{
    return this._roleName
  }
  set userId(value:number){
    this._userId=value;
  }
  get userId():number{
    return this._userId;
  }

  set loginId(value:number){
    this._loginId=value;
  }
  get loginId():number{
    return this._loginId;
  }

  constructor() { }
}
