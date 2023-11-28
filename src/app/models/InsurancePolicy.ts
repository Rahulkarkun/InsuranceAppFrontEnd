export interface InsurancePolicy {
    PolicyNo: number;
    IssueDate: Date;
    MaturityDate: Date;
    PremiumType: string;
    PremiumAmount: number;
    SumAssured: number;
    Status: string;
    PlanId: number;
    PaymentId: number;
    CustomerId: number;
    //IsActive: boolean;
  }
 