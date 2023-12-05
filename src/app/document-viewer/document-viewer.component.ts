import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DocumentService } from '../services/document.service';
import { ActivatedRoute } from '@angular/router';
import { Document } from '../models/document';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrl: './document-viewer.component.css'
})
export class DocumentViewerComponent {
  @Input() document: Document | undefined;
  documentUrl: SafeResourceUrl | undefined;

  constructor(
    private documentService: DocumentService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Extract 'id' from route parameters
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      const id = +idParam; // Convert to number
      this.getDocumentById(id);
    }
  }

  getDocumentById(id: number): void {
    this.documentService.getDocumentById(id).subscribe(
      (data: any) => {
        this.document = data as Document; // Cast data to DocumentDto
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
}
