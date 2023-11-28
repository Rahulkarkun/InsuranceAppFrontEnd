import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceSchemeListComponent } from './insurance-scheme-list.component';

describe('InsuranceSchemeListComponent', () => {
  let component: InsuranceSchemeListComponent;
  let fixture: ComponentFixture<InsuranceSchemeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsuranceSchemeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsuranceSchemeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
