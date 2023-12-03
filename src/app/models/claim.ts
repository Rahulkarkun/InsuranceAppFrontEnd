// src/app/claim.model.ts

export interface Claim {
    ClaimId: number;
    ClaimAmount: number;
    BankAccountNumber: string;
    BankIfscCode: string;
    Date: Date;
    Status: string;
    PolicyNo: string;
    CustomerId:number;
    //IsActive: boolean;
  }
  