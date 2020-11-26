import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map } from 'rxjs/operators'

import * as fromhomeActions from './home.actions'

@Injectable()
export class HomeEffects{

    text$ = createEffect(() => this.actions$
        .pipe(
            ofType(fromhomeActions.changeText),
            map(({ text }) => console.log(text))
        ),
        { dispatch: false },
    );


    constructor(private actions$: Actions){

    }
}