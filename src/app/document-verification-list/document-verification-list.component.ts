import { Component,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentService } from '../services/document.service';
import { Router } from '@angular/router';
import { TemporaryDataService } from '../services/temporary-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Document } from '../models/document';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CustomerService } from '../services/customer.service';


@Component({
  selector: 'app-document-verification-list',
  templateUrl: './document-verification-list.component.html',
  styleUrl: './document-verification-list.component.css'
})
export class DocumentVerificationListComponent {
  // customerName = '';
  customerData: Array<any>;

  documents: Array<any>;
  page: number = 1;
  totalRecords:number=0
  selectedItemsPerPage: number = 5; // Set a default value, or fetch it from user preferences
  userRole:string=''
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private documentService: DocumentService, 
    private customerService:CustomerService,
    private router: Router,
    
    private temporaryData:TemporaryDataService) 
  { this.documents=new Array<any>()
    this.customerData= new Array<any>()
    this.userRole=temporaryData.getRole()
    console.log(this.userRole)}

  ngOnInit(): void {
    this.customerService.getAllCustomers().subscribe(
      {
        next:(data)=>{
        this.customerData= data
        console.log(data)
        this.totalRecords=data.length
        // this.setupPaginator();
      },
      error:(errorResponse:HttpErrorResponse)=>{
        console.log(errorResponse); 
      }
    }
    );
    this.fetchDocuments();
  }

  fetchDocuments(): void {
    debugger
    this.documentService.getAllDocuments().subscribe(
      {
        next:(data)=>{
        this.documents= data
        console.log(data)
        this.totalRecords=data.length
        // this.setupPaginator();
      },
      error:(errorResponse:HttpErrorResponse)=>{
        console.log(errorResponse); 
      }
    }
    );
  }
 
//   editClaim(claimId: number): void {
//     // Navigate to the update claim page with the claim ID
//     this.router.navigate(['/update-claim', claimId]);
// }
resolveDocument(documentId: number): void {
  this.documentService.getDocumentById(documentId).subscribe(
    (document: Document) => {
      // Assuming 'IsActive' is a boolean property
      document.Status = 'Verified';

      this.documentService.updateDocumentStatus(document).subscribe(
        (updatedDocument) => {
          console.log('Document Verified successfully:', updatedDocument);
          this.fetchDocuments();
        },
        (error) => {
          console.error('Error updating documents:', error);
        }
      );
    },
    (error) => {
      console.error('Error fetching documents:', error);
    }
  );
}
editDocument(documentId: number): void {
  // Navigate to the view-document route with the document ID
  this.router.navigate(['/view-document', documentId]);
}

// getCustomerName(customerId:number):string{
//   this.customerService.getCustomerById(customerId).subscribe(
//     (data) => {
//      this.customerName = data.FirstName + " " + data.LastName

//     },

// )
// return this.customerName;
// }
getCustomerName(customerId: number): string {
  if (this.customerData) {
    const customer = this.customerData.find((a: any) => a.customerId === customerId);
    console.log(customer);
    return customer!=null ? `${customer.firstName} ${customer.lastName}` : 'Customer Not Found';
  } else {
    return 'Customer name Not Loaded';
  }
}




onItemsPerPageChange(): void {
  this.page = 1; // Reset to the first page when items per page changes
  this.fetchDocuments(); // Fetch data with the new items per page
}

// setupPaginator(): void {
//   this.paginator.pageSizeOptions = [5,10,20]; // Set your desired page size options
//   this.paginator.pageSize = 5; // Set the initial page size
//   this.paginator.showFirstLastButtons = true;
//   // Attach the paginator to the data source
//   this.documents.paginator = this.paginator;
// }

// Add a page event handler to handle page changes
// onPageChange(event: PageEvent): void {
//   // You can perform additional actions here if needed
//   console.log('Page event:', event);
// }

}