import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentService } from '../services/document.service';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrl: './upload-document.component.css'
})
export class UploadDocumentComponent {
  byteFile: Uint8Array | null = null;
  documents: Document[] = [];
  documentDto: any = {
    documentType: '',
    documentName: '',
    customerId: 0,
    file: ''
  };

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    // Load documents if needed
  }

  onFileSelected(event: any) {
    debugger;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.documentDto.file = file;
    }
  }

  convertFileToBytes(file: File): Promise<Uint8Array> {
    return new Promise<Uint8Array>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (result instanceof ArrayBuffer) {
          const bytes = new Uint8Array(result);
          resolve(bytes);
        } else {
          reject(new Error('Failed to read file as ArrayBuffer'));
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  }

  async uploadFile() {
    if (this.documentDto.file) {
      try {
        debugger
        this.byteFile = await this.convertFileToBytes(this.documentDto.file);

        const formData = new FormData();
        formData.append('documentType', this.documentDto.documentType);
        formData.append('documentName', this.documentDto.documentName);
        formData.append('customerId', this.documentDto.customerId.toString());
        const blob = new Blob([this.byteFile]);
        formData.append('file', blob, this.documentDto.file.name);

        // formData.append('file', this.byteFile);

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
      } catch (error) {
        console.error('Failed to convert file to bytes:', error);
        // Handle error, provide user feedback, etc.
      }
    } else {
      console.warn('No file selected for upload');
      // Provide user feedback about selecting a file
    }
  }
}
