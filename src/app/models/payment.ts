export interface Payment {
    PaymentId: number;
    PaymentType: string;
    Amount: number;
    Date: Date;
    Tax: number;
    TotalPayment: number;
    CustomerId:number;
    PolicyNo:number;
    //IsActive: boolean;
  }
 