// document.model.ts

export interface Document {
    DocumentId: number;
    DocumentType: string;
    DocumentName: string;
    DocumentFile: null |Uint8Array; // Assuming you handle file data as a byte array
    IsActive: boolean;
    CustomerId: number;
    Customer?: any; // You might want to create a separate Customer model if needed
  }
  