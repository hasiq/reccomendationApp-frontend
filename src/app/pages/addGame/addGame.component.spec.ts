/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddGameComponent } from './addGame.component';

describe('AddGameComponent', () => {
  let component: AddGameComponent;
  let fixture: ComponentFixture<AddGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
