import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';

import * as fromhomeActions from './state/home.actions'
import * as fromhomeSelectors from './state/home.selectors'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  text: string;

  searchControl: FormControl;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.searchControl = new FormControl('', Validators.required)

    this.store.pipe(select(fromhomeSelectors.selectHomeText)).subscribe(text => this.text = text)
  }

  doSearch(){
    const text = this.searchControl.value;
    this.store.dispatch(fromhomeActions.changeText({ text }));
  }

}
