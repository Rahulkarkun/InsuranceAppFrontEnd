import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQueryListComponent } from './view-query-list.component';

describe('ViewQueryListComponent', () => {
  let component: ViewQueryListComponent;
  let fixture: ComponentFixture<ViewQueryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewQueryListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewQueryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
