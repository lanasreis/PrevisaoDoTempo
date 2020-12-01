import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { map, takeUntil } from 'rxjs/operators';

import { Units } from 'src/app/shared/models/units.enum';
import { Bookmark } from 'src/app/shared/models/bookmark.model';
import { CityWeather } from 'src/app/shared/models/weather.model';

import * as fromhomeActions from '../../state/home.actions'
import * as fromhomeSelectors from '../../state/home.selectors'
import * as fromBookmarksSelectors from '../../../bookmarks/state/bookmarks.selectors'
import * as fromConfigSelectors from '../../../../shared/state/config/config.selectors'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {

  cityWeather: CityWeather;
  cityWeather$: Observable<CityWeather>;
  loading$: Observable<boolean>
  error$: Observable<boolean>

  bookmarksList$: Observable<Bookmark[]>
  isCurrentFavorite$: Observable<boolean>

  text: string;

  searchControl: FormControl;

  unit$: Observable<Units>

  private componentDestroyed$ = new Subject()


  constructor(private store: Store) { }

  ngOnInit(): void {
    this.searchControl = new FormControl('', Validators.required)
          
    this.cityWeather$ = this.store.pipe(select(fromhomeSelectors.selectCurrentWeather));
    this.cityWeather$
              .pipe(takeUntil(this.componentDestroyed$))
              .subscribe(value => this.cityWeather = value);

    this.loading$ = this.store.pipe(select(fromhomeSelectors.selectCurrentWeatherLoading))
    this.error$  = this.store.pipe(select(fromhomeSelectors.selectCurrentWeatherError))
  
    this.bookmarksList$ = this.store.pipe(select(fromBookmarksSelectors.selectBookmarksList));

    this.isCurrentFavorite$ = combineLatest([this.cityWeather$, this.bookmarksList$])
      .pipe(
        map(([current, bookmarkList]) => {
          if(!!current){
            return bookmarkList.some(bookmark => bookmark.id === current.city.id)
          }

          return false;
        })
      )

    this.unit$ = this.store.pipe(select(fromConfigSelectors.selectUnitConfig))
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
