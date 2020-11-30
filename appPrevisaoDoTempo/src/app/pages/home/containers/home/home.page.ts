import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { takeUntil } from 'rxjs/operators';
import { Bookmark } from 'src/app/shared/models/bookmark.model';
import { CityWeather } from 'src/app/shared/models/weather.model';

import * as fromhomeActions from '../../state/home.actions'
import * as fromhomeSelectors from '../../state/home.selectors'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {

  cityWeather: CityWeather;
  loading$: Observable<boolean>
  error$: Observable<boolean>

  text: string;

  private componentDestroyed$ = new Subject()

  searchControl: FormControl;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.searchControl = new FormControl('', Validators.required)
          
    this.store
      .pipe(
        select(fromhomeSelectors.selectCurrentWeather),
        takeUntil(this.componentDestroyed$))
      .subscribe(value => this.cityWeather = value)
    this.loading$ = this.store.pipe(select(fromhomeSelectors.selectCurrentWeatherLoading))
    this.error$  = this.store.pipe(select(fromhomeSelectors.selectCurrentWeatherError))
  }

  ngOnDestroy(){
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

  doSearch(){
    const query = this.searchControl.value;
    this.store.dispatch(fromhomeActions.loadCurrentWeather({query}))
  }

  onToggleBookmark(){
    const bookmark: Bookmark = new Bookmark()

    bookmark.id = this.cityWeather.city.id;
    bookmark.name = this.cityWeather.city.name;
    bookmark.country = this.cityWeather.city.country;
    bookmark.coord = this.cityWeather.city.coord;
    
    this.store.dispatch(fromhomeActions.toggleBookmark({ entity: bookmark }))
  }

}
