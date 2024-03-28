import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMarkerComponent } from './add-marker.component';

describe('AddMarkerComponent', () => {
  let component: AddMarkerComponent;
  let fixture: ComponentFixture<AddMarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMarkerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
