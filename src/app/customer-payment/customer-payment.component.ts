import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { TemporaryDataService } from '../services/temporary-data.service';

@Component({
  selector: 'app-customer-payment',
  templateUrl: './customer-payment.component.html',
  styleUrl: './customer-payment.component.css'
})
export class CustomerPaymentComponent {
  userRole:string='';
  constructor(protected auth:AuthService,private temporaryData: TemporaryDataService)
  {this.userRole = temporaryData.getRole();
    console.log(this.userRole)}
  options = {
   "key": "rzp_test_Nc92uzv9z8F89F", // Enter the Key ID generated from the Dashboard
   "amount": "1000"+"00",
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
 pay(){
   this.rzp1 = new this.auth.nativeWindow.Razorpay(this.options);
   this.rzp1.open();
 }
}
