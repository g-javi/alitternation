import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepotMapComponent } from './depot-map.component';

describe('DepotMapComponent', () => {
  let component: DepotMapComponent;
  let fixture: ComponentFixture<DepotMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepotMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepotMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
