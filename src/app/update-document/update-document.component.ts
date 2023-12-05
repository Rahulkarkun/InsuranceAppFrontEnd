// import { Component, OnInit , Inject} from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { DocumentService } from '../services/document.service';
// import { Document } from '../models/document';
// import { tap } from 'rxjs';

// @Component({
//   selector: 'app-update-document',
//   templateUrl: './update-document.component.html',
//   styleUrls: ['./update-document.component.css']
// })
// export class UpdateDocumentComponent implements OnInit {
//   documentId: number = 0;
//   document: Document = {
//     DocumentId: 0, // Set to the appropriate default value
//     DocumentType: '',
//     DocumentName: '',
//     Status: '',
//     DocumentFile: null, // Set to the appropriate default value
//     IsActive: false, // Set to the appropriate default value
//     CustomerId: 0 // Set to the appropriate default value
//     // Add other fields as needed
//   };

//   stringData: string = ''; 
//   // console.log(stringData);
//   constructor(
//     @Inject(ActivatedRoute) private route: ActivatedRoute,
//     private documentService: DocumentService
//   ) {}

//   ngOnInit(): void {
//     // Extract document ID from the URL in the ngOnInit lifecycle hook
//     // this.documentId = this.route.snapshot.paramMap.get('id');
//     const idParam = this.route.snapshot.paramMap.get('id');
//     this.documentId = idParam ? +idParam : 0;
//     // Fetch document details from the API
//     // this.documentService.getDocumentById(this.documentId).subscribe(
//     //   (document: Document) => {
//     //     this.document = document;
//     //     if(document.DocumentFile!=null){

//     //       const numberArray = Array.from(document.DocumentFile);
//     //       this.stringData = String.fromCharCode.apply(null, numberArray);
//     //     }

//     //   },
//     //   error => {
//     //     console.error('Error fetching document details:', error);
//     //   }
//     // );
//     this.documentService.getDocumentById(this.documentId)
//     .pipe(
//       tap((document: Document) => {
//         this.document = document;
//         if (document.DocumentFile != null) {
//           const numberArray = Array.from(document.DocumentFile);
//           this.stringData = String.fromCharCode.apply(null, numberArray);
//         }
//       })
//     )
//     .subscribe({ complete: () => console.info('Subscription completed.') });
//   }

//   // updateDocumentStatus(): void {
//   //   this.document.IsActive = true;
//   //   // Call API to update only the 'isActive' field
//   //   this.documentService.updateDocumentStatus(this.documentId, this.document ).subscribe(
//   //     (updatedDocument: Document) => {
//   //       // Optionally update the local document object with the updated data
//   //       this.document.IsActive = updatedDocument.IsActive;
//   //     },
//   //     error => {
//   //       console.error('Error updating document status:', error);
//   //     }
//   //   );
//   // }
//   updateDocumentStatus(): void {
//     this.document.IsActive = true;
  
//     // Call API to update only the 'isActive' field
//     this.documentService.updateDocumentStatus(this.document).subscribe({
//       next: (updatedDocument: Document) => {
//         // Optionally update the local document object with the updated data
//         this.document.IsActive = updatedDocument.IsActive;
//       },
//       error: (error) => {
//         console.error('Error updating document status:', error);
//       },
//       complete: () => {
//         console.info('Update document status completed.');
//       }
//     });
//   }
  
// }
