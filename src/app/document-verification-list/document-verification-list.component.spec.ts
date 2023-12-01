import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentVerificationListComponent } from './document-verification-list.component';

describe('DocumentVerificationListComponent', () => {
  let component: DocumentVerificationListComponent;
  let fixture: ComponentFixture<DocumentVerificationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentVerificationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentVerificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
