import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemporaryDataService {

  private id= new BehaviorSubject(0);
  private role:string='some';
  private loginId:number=0;
  private _insurancePlanId:number=0
  private _insuranceSchemeId:number=0
  private _totalAmt:number=0;
  private _installmentAmt:number=0;
  private _interestAmt:number=0;
  private _policyTerm:number=0;
  private _policyNo:number=0;
  private _totalInvestmentAmt:number=0;
  private _months:number=0;
  private _insuranceAccountData:any;
  private _premiumType: string = '';
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

  set insurancePlanId(id:number){
    this._insurancePlanId=id
  }
  get insurancePlanId():number{
    return this._insurancePlanId
  }

  set insuranceSchemeId(id:number){
    this._insuranceSchemeId=id
  }

  get insuranceSchemeId():number{
    return this._insuranceSchemeId
  }

  set totalAmt(amt:number){
    this._totalAmt=amt
  }
  get totalAmt():number{
    return this._totalAmt
  }
  set policyNo(policyNo:number){
    this._policyNo=policyNo
  }
  get policyNo():number{
    return this._policyNo
  }


  set premiumType(type:string){
    this._premiumType=type
  }
  get premiumType():string{
    return this._premiumType
  }


  set installmentAmt(amt:number){
    this._installmentAmt=amt
  }
  get installmentAmt():number{
    return this._installmentAmt
 }

 set interestAmt(amt:number){
  this._interestAmt=amt
}
get interestAmt():number{
  return this._interestAmt
}

set policyTerm(num:number){
  this._policyTerm=num
}
get policyTerm():number{
  return this._policyTerm
}

set totalInvestmentAmt(amt:number){
  this._totalInvestmentAmt=amt
}
get totalInvestmentAmt():number{

  return this._totalInvestmentAmt
}

set months(num:number){
  this._months=num
}
get months():number{
  return this._months
}

set insuranceAccountData(data:any){
  this._insuranceAccountData=data
}
get insuranceAccountData():any{
  return this._insuranceAccountData
}

}