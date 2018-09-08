import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailInfoComponent } from './item-detail-info.component';

describe('ItemDetailInfoComponent', () => {
  let component: ItemDetailInfoComponent;
  let fixture: ComponentFixture<ItemDetailInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDetailInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
