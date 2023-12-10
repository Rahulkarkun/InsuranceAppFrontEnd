import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryService } from '../services/query.service';
import { TemporaryDataService } from '../services/temporary-data.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-update-query',
  templateUrl: './update-query.component.html',
  styleUrl: './update-query.component.css'
})
export class UpdateQueryComponent implements OnInit{
  queryForm!: FormGroup;
  queryId: number = 0;
  userRole: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private queryService: QueryService,
    private temporaryData: TemporaryDataService
  ) {
    this.userRole = temporaryData.getRole();
  }

  ngOnInit(): void {
    var token = localStorage.getItem('token');
    var role = this.userRole;

    if (token == null) {
      alert('Please login');
      this.router.navigateByUrl('/login');
    } else if (role !== 'Employee') {
      alert('Please Login As Employee');
      this.router.navigateByUrl('/login');
    }
    this.initForm();
    this.route.params.subscribe(params => {
      const idParam = +params['id'];
      if (!isNaN(idParam)) {
        this.queryId = idParam;
        this.fetchQueryDetails();
      } else {
        console.error('Invalid id parameter:', idParam);
      }
    });
  }

  initForm(): void {
    this.queryForm = this.fb.group({
      queryId: [0, Validators.required],
      queryTitle : ['',Validators.required],
      queryMessage : ['',Validators.required],
      queryDate : ['',Validators.required],
      reply : ['',Validators.required],
      customerId : [0],
    });
  }

  fetchQueryDetails(): void {
    this.queryService.getQueryById(this.queryId).subscribe(
      (data) => {
        this.queryForm.patchValue(data);
      },
      (error) => {
        console.error('Error fetching Query details:', error);
      }
    );
  }

  async updateQuery(): Promise<void> {
    debugger
    console.log('Updating Query with data:', this.queryForm.value);
    try {
      const updatedQuery = await lastValueFrom(
        this.queryService.updateQuery(this.queryForm.value)
      );
      console.log('Query updated:', updatedQuery);

      // Display an alert to the user
      alert('Query updated successfully!');
    } catch (error) {
      console.error('Error updating Query:', error);

      // Display an error alert to the user
      alert('Error updating Query. Please try again.');
    }
  }
}
