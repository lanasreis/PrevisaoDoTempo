import { state } from "@angular/animations"
import { createReducer, Action, on } from "@ngrx/store"
import * as fromHomeActions from  "./home.actions"

export interface HomeState{
    text: string,
}


export const homeInitialsate: HomeState = {
    text: 'Porto Alegre',
}


const reducer = createReducer(
    homeInitialsate,
    on(fromHomeActions.changeText, (state, { text }) => ({
        ...state,
        text,
    })),
);


export function homeReducer(state: HomeState | undefined, action: Action): HomeState{
    return reducer(state, action)
}