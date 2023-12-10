import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentService } from '../services/document.service';
import { TemporaryDataService } from '../services/temporary-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrl: './upload-document.component.css'
})
export class UploadDocumentComponent {
  documents: Document[] = [];
  userRole:string='';
  documentDto: any = {
    documentType: '',
    documentName: '',
    customerId: 0,
    
    file: null
  };

  constructor(private documentService: DocumentService,
    private temporaryData:TemporaryDataService,
    private router: Router) 
    {
      this.userRole=temporaryData.getRole()
    console.log(this.userRole)
    }

  ngOnInit() {
    var token=localStorage.getItem('token')
    
    var role = this.userRole
    if(token==null){
      alert('Please login')
      this.router.navigateByUrl('/login')
    }
    else if(role!='Customer'){
      alert('Please Login As Customer')
      this.router.navigateByUrl('/login')
    }
    // Load documents if needed
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.documentDto.file = file;
    }
  }

  uploadFile() {
    if (this.documentDto.file) {
      const formData = new FormData();
      formData.append('documentType', this.documentDto.documentType);
      formData.append('documentName', this.documentDto.documentName);
      formData.append('customerId', this.documentDto.customerId.toString());
      formData.append('file', this.documentDto.file);

      this.documentService.uploadFile(formData).subscribe(
        response => {
          console.log('File upload successful:', response);
          // Optionally, you can reload documents or perform other actions
        },
        error => {
          console.error('File upload failed:', error);
          // Handle error, provide user feedback, etc.
        }
      );
    } else {
      console.warn('No file selected for upload');
      // Provide user feedback about selecting a file
    }
  }
}
