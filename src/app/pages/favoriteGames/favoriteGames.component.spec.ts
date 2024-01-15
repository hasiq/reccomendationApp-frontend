/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FavoriteGamesComponent } from './favoriteGames.component';

describe('FavoriteGamesComponent', () => {
  let component: FavoriteGamesComponent;
  let fixture: ComponentFixture<FavoriteGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
