import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdInterestCalculatorComponent } from './sd-interest-calculator.component';

describe('SdInterestCalculatorComponent', () => {
  let component: SdInterestCalculatorComponent;
  let fixture: ComponentFixture<SdInterestCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SdInterestCalculatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SdInterestCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
