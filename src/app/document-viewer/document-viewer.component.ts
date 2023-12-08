// import { Component, Input } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { DocumentService } from '../services/document.service';
// import { ActivatedRoute } from '@angular/router';
// import { Document } from '../models/document';

// @Component({
//   selector: 'app-document-viewer',
//   templateUrl: './document-viewer.component.html',
//   styleUrl: './document-viewer.component.css'
// })
// export class DocumentViewerComponent {
//   @Input() document: Document | undefined;
//   documentUrl: SafeResourceUrl | undefined;

//   constructor(
//     private documentService: DocumentService,
//     private sanitizer: DomSanitizer,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     // Extract 'id' from route parameters
//     const idParam = this.route.snapshot.paramMap.get('id');

//     if (idParam) {
//       const id = +idParam; // Convert to number
//       this.getDocumentById(id);
//     }
//   }

//   getDocumentById(id: number): void {
//     this.documentService.getDocumentById(id).subscribe(
//       (data: any) => {
//         this.document = data as Document; // Cast data to DocumentDto
//         console.log(this.document);
//         this.loadDocument();
//       },
//       error => console.error('Failed to fetch document', error)
//     );
//   }

//   loadDocument(): void {
//     if (this.document && this.document.documentFile) {
//       const byteArray = this.base64ToArrayBuffer(this.document.documentFile.toString());
//       const blob = new Blob([byteArray], { type: 'application/pdf' });
//       this.documentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
//     }
//   }

//   private base64ToArrayBuffer(base64: string): Uint8Array {
//     const binaryString = window.atob(base64);
//     const length = binaryString.length;
//     const bytes = new Uint8Array(length);

//     for (let i = 0; i < length; i++) {
//       bytes[i] = binaryString.charCodeAt(i);
//     }

//     return bytes;
//   }
// }
// document-viewer.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../services/document.service';
import { Document } from '../models/document';
//import { DocumentDto } from '../document-dto';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
   selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrl: './document-viewer.component.css'
})
export class DocumentViewerComponent implements OnInit {
  @Input() document: Document | undefined;
  documentUrl: SafeResourceUrl | undefined;

  constructor(
    private router : Router,
    private documentService: DocumentService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      const id = +idParam;
      this.getDocumentById(id);
    }
  }

  getDocumentById(id: number): void {
    this.documentService.getDocumentById(id).subscribe(
      (data: any) => {
        this.document = data as Document;
        console.log(this.document);
        this.loadDocument();
      },
      error => console.error('Failed to fetch document', error)
    );
  }

  loadDocument(): void {
    if (this.document && this.document.documentFile) {
      const byteArray = this.base64ToArrayBuffer(this.document.documentFile.toString());
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      this.documentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
    }
  }

  private base64ToArrayBuffer(base64: string): Uint8Array {
    const binaryString = window.atob(base64);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes;
  }

  verifyDocument(): void {
      this.updateDocumentStatus('Verified');
    
  }

  unverifyDocument(): void {
      this.updateDocumentStatus('Unverified');
    
  }

  private updateDocumentStatus(newStatus: string): void {
    if (this.document) {
      this.documentService.updateDocumentStatus(this.document.documentId).subscribe(
        (data) => {
          console.log(data)
          console.log('Document status updated successfully');
          this.router.navigateByUrl('/document-verification-list');
          // Update the local status for immediate UI change
          // this.document.Status = newStatus;
        },
        error => console.error('Failed to update document status', error)
      );
    }
  }
}