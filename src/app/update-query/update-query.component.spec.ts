import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQueryComponent } from './update-query.component';

describe('UpdateQueryComponent', () => {
  let component: UpdateQueryComponent;
  let fixture: ComponentFixture<UpdateQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateQueryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
