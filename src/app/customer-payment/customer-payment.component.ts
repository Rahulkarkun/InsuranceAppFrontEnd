import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { TemporaryDataService } from '../services/temporary-data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../services/payment.service';
import { DataService } from '../services/data.service';
import { InsurancePolicyService } from '../services/insurance-policy.service';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-payment',
  templateUrl: './customer-payment.component.html',
  styleUrl: './customer-payment.component.css'
})
export class CustomerPaymentComponent {
  payment!: FormGroup; 
  date=new Date().toISOString().split('T')[0];
  taxAmt:number=0
  totalAmt:number=0
  paymentType:string='RazorPay'
  // customerId:number=0
  userRole:string='';
  CustomerId: number = 0;
  PolicyNo: number = 0;
  customerData: Array<any>;
  policyData: Array<any>;
  constructor(protected auth:AuthService,
    private paymentService:PaymentService,
    private fb: FormBuilder,
    private insurancePolicy:InsurancePolicyService,
    private dataService:DataService,
    private customerService: CustomerService,
    protected temporaryData: TemporaryDataService)
  {this.customerData = new Array<any>()
    this.policyData = new Array<any>()
    this.taxAmt=temporaryData.installmentAmt*0.06
    this.totalAmt=temporaryData.installmentAmt*1+this.taxAmt*1
    //this.customerId=dataService.userId
    this.userRole = temporaryData.getRole();
    console.log(this.userRole)}
    ngOnInit(): void {
      this.payment=this.fb.group({
        paymentType : ['',Validators.required],
        amount : ['',Validators.required],
        date : ['',Validators.required],
        tax : ['',Validators.required],
        totalPayment : ['',Validators.required],
        customerId : ['',Validators.required],
        policyNo : ['',Validators.required],
      });
      this.customerService.getByuserId(this.dataService.userId).subscribe({
        next: (customerData) => {
          console.log('Customer data received:', customerData);
          this.CustomerId = customerData.customerId;
          console.log(this.CustomerId)
          this.payment.patchValue({
            customerId: this.CustomerId})
        },
        error: (error) => {
          console.error('Error fetching customer details:', error);
        }
      });
    }

  options = {
   "key": "rzp_test_Nc92uzv9z8F89F", // Enter the Key ID generated from the Dashboard
   "amount": this.temporaryData.totalAmt+"00",
   "currency": "INR",
   "description": "Acme Corp",
   "image": "https://s3.amazonaws.com/rzp-mobile/images/rzp.jpg",
   "prefill":
   {
     "email": "simranshyampatil4@gmail.com",
     "contact": +918433763086,
   },
   config: {
     display: {
       blocks: {
         utib: { //name for Axis block
           name: "Pay using Axis Bank",
           instruments: [
             {
               method: "card",
               issuers: ["UTIB"]
             },
             {
               method: "netbanking",
               banks: ["UTIB"]
             },
             {
               method: 'upi'
             },
           ]
         },
         other: { //  name for other block
           name: "Other Payment modes",
           instruments: [
             {
               method: "card",
               issuers: ["ICIC"]
             },
             {
               method: 'netbanking',
             }
           ]
         }
       },
       // hide: [
       //   {
       //   method: "upi"
       //   }
       // ],
       sequence: ["block.utib", "block.other"],
       preferences: {
         show_default_blocks: false // Should Checkout show its default blocks?
       }
     }
   },
   // "handler": function (response) {
   //   alert(response.razorpay_payment_id);
   // },
   "modal": {
     "ondismiss": function () {
       if (confirm("Are you sure, you want to close the form?")) {
         const txt = "You pressed OK!";
         console.log("Checkout form closed by the user");
       } else {
         const txt = "You pressed Cancel!";
         console.log("Complete the Payment")
       }
     }
   }
 };
 rzp1:any;
  pay(data:any){
    debugger
    this.paymentService.addPayment(data).subscribe((response)=>{
      console.log(response)
      this.insurancePolicy.addInsurancePolicy(this.temporaryData.insuranceAccountData).subscribe((response)=>{
        console.log(response)
      })
    })
    console.log(Math.round(this.totalAmt)*1);
    console.log(this.totalAmt);
    
    this.rzp1 = new this.auth.nativeWindow.Razorpay(this.options);
    this.rzp1.open();
    
  }
//  rzp1:any;
//  pay(){
//    this.rzp1 = new this.auth.nativeWindow.Razorpay(this.options);
//    this.rzp1.open();
//  }
}
