import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AddUserComponent } from './add-user.component';
import { DataService } from '../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { from, Observable } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let router: Router;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ AddUserComponent ],
      providers: [FormBuilder, { provide: ActivatedRoute, useValue: { queryParams: from([{ id: 1 }]) } }, DataService]
    })
    .compileComponents();
    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const role = 'admin';
    localStorage.user = JSON.stringify(role);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call submit', () => {
    const submitSpy: jasmine.Spy = spyOn(component, 'onSubmit').and.callThrough();
    component.onSubmit();
    expect(submitSpy).toHaveBeenCalled();
  });

});
