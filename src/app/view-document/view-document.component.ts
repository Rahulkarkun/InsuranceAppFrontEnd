
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../services/document.service';
import { Document } from '../models/document';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.css']
})
export class ViewDocumentComponent implements OnInit {
  documentId: number = 0;
  documentType: string = '';
  documentName: string = '';
  customerId: number = 0;
  documentFile: any;
  document: any;

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadDocumentDetails();
  }

  loadDocumentDetails() {
    const documentId = +this.route.snapshot.paramMap.get('id')!;
    this.documentService.getDocumentById(documentId).subscribe(
      (document) => {
        this.document = document;
        this.convertBytesToFile();
      },
      error => {
        console.error('Error fetching document details:', error);
      }
    );
  }

  // convertBytesToFile() {
  //   if (this.document && this.document.documentFile) {
  //     const blob = new Blob([this.document.documentFile], { type: 'application/pdf' });
  
  //     // Log the blob content
  //     console.log(blob);
  
  //     // Create a safe URL
  //     // const url = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));

  //     const url = window.URL.createObjectURL(blob)
  
  //     // Assign the safe URL to documentFile
  //     this.documentFile = url;
  //     // window.open(url)
  //   }
  // }

  convertBytesToFile() {
    if (this.document && this.document.documentFile) {
      // Assuming documentFile contains base64 encoded PDF data
      const base64Data = this.document.documentFile;
      const blob = new Blob([atob(base64Data)], { type: 'application/pdf' });
  
      // Create a safe URL
      const url = window.URL.createObjectURL(blob);
  
      // Assign the safe URL to documentFile
      this.documentFile = url;
    }
  }

  // convertBytesToFile() {
  //   if (this.document && this.document.documentFile) {
  //     const base64Data = this.document.documentFile;
  //     const decodedData = atob(base64Data);
  //     const blob = new Blob([decodedData], { type: 'application/pdf' });
  
  //     // Create a safe URL
  //     const url = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
  
  //     // Assign the safe URL to documentFile
  //     this.documentFile = url;
  //   }
  // }
  
  

  
  
  
  

  goBack() {
    this.router.navigate(['/document-list']);
  }
}




