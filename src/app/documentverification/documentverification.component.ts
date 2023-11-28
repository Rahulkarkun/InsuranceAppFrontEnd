import { Component } from '@angular/core';
import { DocumentService } from '../services/document.service';
import { Document } from '../models/document';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documentverification',
  templateUrl: './documentverification.component.html',
  styleUrls: ['./documentverification.component.css']
})
export class DocumentverificationComponent {
  allDocuments: Document[] = [];
  inactiveDocuments: Document[] = [];

  constructor(private documentService: DocumentService,  private router: Router) {}

  

  async ngOnInit(): Promise<void> {
    try {
      const documents = await lastValueFrom(this.documentService.getAllDocuments());
      this.allDocuments = documents;
      this.filterInactiveDocuments();
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  }


  filterInactiveDocuments(): void {
    this.inactiveDocuments = this.allDocuments.filter(document => !document.IsActive);
  }

  navigateToUpdate(documentId: number): void {
    // Use Angular Router to navigate to the update component
    this.router.navigate(['/update-document', documentId]);
  
  }
}