import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemedetailsListComponent } from './schemedetails-list.component';

describe('SchemedetailsListComponent', () => {
  let component: SchemedetailsListComponent;
  let fixture: ComponentFixture<SchemedetailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchemedetailsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchemedetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
