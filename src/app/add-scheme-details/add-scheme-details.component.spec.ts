import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSchemeDetailsComponent } from './add-scheme-details.component';

describe('AddSchemeDetailsComponent', () => {
  let component: AddSchemeDetailsComponent;
  let fixture: ComponentFixture<AddSchemeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSchemeDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSchemeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
