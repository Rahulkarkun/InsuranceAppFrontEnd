import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSchemeDetailsComponent } from './update-scheme-details.component';

describe('UpdateSchemeDetailsComponent', () => {
  let component: UpdateSchemeDetailsComponent;
  let fixture: ComponentFixture<UpdateSchemeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSchemeDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateSchemeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
