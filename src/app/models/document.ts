// document.model.ts

export interface Document {
  documentId: number;
  documentType: string;
  documentName: string;
  customerId: number;
  documentFile: Uint8Array | null;
  IsActive: boolean;
  Status: string;

  // DocumentId: number;
  // DocumentType: string;
  // DocumentName: string;
  // DocumentFile: null |Uint8Array; // Assuming you handle file data as a byte array
  // IsActive: boolean;
  // CustomerId: number;
  // Status: string;
  }
  