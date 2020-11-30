import { state } from "@angular/animations"
import { createReducer, Action, on } from "@ngrx/store"
import * as fromHomeActions from  "./home.actions"

export interface HomeState{
    entity: any;
    loading: boolean;
    error: boolean;
}


export const homeInitialsate: HomeState = {
    entity: undefined,
    loading: false,
    error: false,
}


const reducer = createReducer(
    homeInitialsate,
    on(fromHomeActions.loadCurrentWeather, state => ({
        ...state,    
        loading: true,
        error: false,
    })),
    on(fromHomeActions.loadCurrnetWeatherSuccess, (state, {entity}) => ({
        ...state,
        entity,
        loading: false,
    })),
    on(fromHomeActions.loadCurrnetWeatherFail, state => ({
        ...state,
        loading:false,
        error: true,
    }))
);


export function homeReducer(state: HomeState | undefined, action: Action): HomeState{
    return reducer(state, action)
}