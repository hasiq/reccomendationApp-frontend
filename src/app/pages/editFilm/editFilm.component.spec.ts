/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditFilmComponent } from './editFilm.component';

describe('EditFilmComponent', () => {
  let component: EditFilmComponent;
  let fixture: ComponentFixture<EditFilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFilmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
