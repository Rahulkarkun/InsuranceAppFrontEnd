import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimResolveComponent } from './claim-resolve.component';

describe('ClaimResolveComponent', () => {
  let component: ClaimResolveComponent;
  let fixture: ComponentFixture<ClaimResolveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaimResolveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClaimResolveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
