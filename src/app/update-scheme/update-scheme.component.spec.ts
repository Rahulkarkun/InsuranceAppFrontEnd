import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSchemeComponent } from './update-scheme.component';

describe('UpdateSchemeComponent', () => {
  let component: UpdateSchemeComponent;
  let fixture: ComponentFixture<UpdateSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSchemeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
