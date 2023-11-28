import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentverificationComponent } from './documentverification.component';

describe('DocumentverificationComponent', () => {
  let component: DocumentverificationComponent;
  let fixture: ComponentFixture<DocumentverificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentverificationComponent]
    });
    fixture = TestBed.createComponent(DocumentverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
