// // update-agent.component.ts

// import { HttpErrorResponse } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { AgentService } from '../services/agent.service';
// import { Agent } from '../models/agent';
// import { ActivatedRoute, Router } from '@angular/router';
// import { TemporaryDataService } from '../services/temporary-data.service';
// import { lastValueFrom } from 'rxjs';

// @Component({
//   selector: 'app-update-agent',
//   templateUrl: './update-agent.component.html',
//   styleUrls: ['./update-agent.component.css']
// })
// export class UpdateAgentComponent {
//   agentForm!: FormGroup; // Note the non-null assertion operator here
//   agentId: number = 0;
//   userRole:string=''
//   constructor(
//     private fb: FormBuilder,
//     private router:Router,
//     private route: ActivatedRoute,
//     private agentService: AgentService,private temporaryData:TemporaryDataService
//   ) {this.userRole=temporaryData.getRole()
//     console.log(this.userRole)}

//     ngOnInit(): void {
//       this.initForm();
//       this.route.params.subscribe(params => {
//         const idParam = +params['id'];
//         if (!isNaN(idParam)) {
//           this.agentId = idParam;
//           this.fetchAgentDetails();
//         } else {
//           console.error('Invalid id parameter:', idParam);
//           // Handle the case where 'id' is not a valid number
//         }
//       });
//     }
  
//     initForm(): void {
//       this.agentForm = this.fb.group({
//         agentId: [0, Validators.required],
//         firstName: ['', Validators.required],
//       lastName: ['', Validators.required],
//       qualification: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       mobileNo: ['', Validators.required],
//       // userId: [0],
//       userName:[''],
//       password:[''],
//       commissionEarned: [0],
//       });
//     }
  
//     fetchAgentDetails(): void {
//       this.agentService.getAgentById(this.agentId).subscribe(
//         (data) => {
//           // Update the form with the fetched plan details
//           this.agentForm.patchValue(data);
//         },
//         (error) => {
//           console.error('Error fetching Agent details:', error);
//         }
//       );
//     }
  
//     async updateAgent(): Promise<void> {
//       try {
//         const updatedAgent = await lastValueFrom(
//           this.agentService.updateAgent(this.agentForm.value)
//         );
//         console.log('Agent updated:', updatedAgent);
  
//         // Display an alert to the user
//         alert('Agent updated successfully!');
//       } catch (error) {
//         console.error('Error updating Agent:', error);
  
//         // Display an error alert to the user
//         alert('Error updating Agent. Please try again.');
//       }
//     }
// }


// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { AgentService } from '../services/agent.service';
// import { TemporaryDataService } from '../services/temporary-data.service';
// import { lastValueFrom } from 'rxjs';
// import { HttpErrorResponse } from '@angular/common/http';

// @Component({
//   selector: 'app-update-agent',
//   templateUrl: './update-agent.component.html',
//   styleUrls: ['./update-agent.component.css']
// })
// export class UpdateAgentComponent implements OnInit {
//   agentForm!: FormGroup;
//   agentId: number = 0;
//   userRole: string = '';

//   constructor(
//     private fb: FormBuilder,
//     private router: Router,
//     private route: ActivatedRoute,
//     private agentService: AgentService,
//     private temporaryData: TemporaryDataService
//   ) {
//     this.userRole = temporaryData.getRole();
//   }

//   ngOnInit(): void {
//     this.initForm();
//     this.route.params.subscribe(params => {
//       const idParam = +params['id'];
//       if (!isNaN(idParam)) {
//         this.agentId = idParam;
//         this.fetchAgentDetails();
//       } else {
//         console.error('Invalid id parameter:', idParam);
//       }
//     });
//   }

//   initForm(): void {
//     this.agentForm = this.fb.group({
//       agentId: [0, Validators.required],
//       firstName: ['', Validators.required],
//       lastName: ['', Validators.required],
//       qualification: ['', Validators.required], // Add this line
//       email: ['', [Validators.required, Validators.email]],
//       mobileNo: ['', Validators.required],
//       commissionEarned: [0, Validators.required],
//       userId: [0],
//       userName: [''],
//       password: [''],
//     });
//   }
  

//   fetchAgentDetails(): void {
//     this.agentService.getAgentById(this.agentId).subscribe(
//       (data) => {
//         this.agentForm.patchValue(data);
//       },
//       (error) => {
//         console.error('Error fetching Agent details:', error);
//       }
//     );
//   }

// //   async updateAgent(): Promise<void> {
// //     console.log('Updating Agent with data:', this.agentForm.value);

// //     try {
// //       const updatedAgent = await lastValueFrom(
// //         this.agentService.updateAgent(this.agentForm.value)
// //       );
// //       console.log('Agent updated:', updatedAgent);

// //       // Display an alert to the user
// //       alert('Agent updated successfully!');
// //     } catch (error) {
// //       console.error('Error updating Agent:', error);

// //       if (error instanceof HttpErrorResponse) {
// //         // Handle specific HTTP errors here
// //         if (error.status === 400) {
// //           const validationErrors = error.error.errors;
// //           console.error('Validation errors:', validationErrors);
// //           // Display validation error messages to the user as needed
// //           // Example: alert(validationErrors.Qualification[0]);
// //         }
// //       }

// //       // Display a generic error alert to the user
// //       alert('Error updating Agent. Please try again.');
// //     }
// //   }
// // }


// async updateAgent(): Promise<void> {
//   console.log('Updating Agent with data:', this.agentForm.value);

//   try {
//     const updatedAgent = await lastValueFrom(
//       this.agentService.updateAgent(this.agentForm.value)
//     );
//     console.log('Agent updated:', updatedAgent);

//     // Display an alert to the user
//     alert('Agent updated successfully!');
//   } catch (error) {
//     console.error('Error updating Agent:', error);

//     // Display an error alert to the user
//     alert('Error updating Agent. Please try again.');
//   }
// }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentService } from '../services/agent.service';
import { TemporaryDataService } from '../services/temporary-data.service';
import { lastValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-agent',
  templateUrl: './update-agent.component.html',
  styleUrls: ['./update-agent.component.css']
})
export class UpdateAgentComponent implements OnInit {
  agentForm!: FormGroup;
  agentId: number = 0;
  userRole: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private agentService: AgentService,
    private temporaryData: TemporaryDataService
  ) {
    this.userRole = temporaryData.getRole();
  }

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe(params => {
      const idParam = +params['id'];
      if (!isNaN(idParam)) {
        this.agentId = idParam;
        this.fetchAgentDetails();
      } else {
        console.error('Invalid id parameter:', idParam);
      }
    });
  }

  initForm(): void {
    this.agentForm = this.fb.group({
      agentId: [0, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      qualification: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', Validators.required],
      commissionEarned: [0, Validators.required],
      userId: [0],
      userName: [''],
      password: [''],
    });
  }

  fetchAgentDetails(): void {
    this.agentService.getAgentById(this.agentId).subscribe(
      (data) => {
        this.agentForm.patchValue(data);
      },
      (error) => {
        console.error('Error fetching Agent details:', error);
      }
    );
  }

  async updateAgent(): Promise<void> {
    debugger
    console.log('Updating Agent with data:', this.agentForm.value);
    try {
      const updatedAgent = await lastValueFrom(
        this.agentService.updateAgent(this.agentForm.value)
      );
      console.log('Agent updated:', updatedAgent);

      // Display an alert to the user
      alert('Agent updated successfully!');
    } catch (error) {
      console.error('Error updating Agent:', error);

      // Display an error alert to the user
      alert('Error updating Agent. Please try again.');
    }
  }
}
