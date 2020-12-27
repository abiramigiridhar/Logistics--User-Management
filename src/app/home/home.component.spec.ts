import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { DataService } from '../services/data.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();
    service = TestBed.inject(DataService);
  }));

  beforeEach(() => {
    const role = 'admin';
    localStorage.user = JSON.stringify(role);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get getDefaultOptions', () => {
    const getDefaultOptions: jasmine.Spy = spyOn(component, 'getDefaultOptions').and.callThrough();
    component.getDefaultOptions();
    expect(getDefaultOptions).toHaveBeenCalled();
  });

});
