import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocPage } from './geoloc.page';

describe('GeolocPage', () => {
  let component: GeolocPage;
  let fixture: ComponentFixture<GeolocPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeolocPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeolocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
