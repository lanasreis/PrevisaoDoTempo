import { createReducer, Action } from "@ngrx/store"

export interface HomeState{
}
export const homeInitialsate: HomeState = {

}

const reducer = createReducer(
    homeInitialsate,
);

export function homeReducer(state: HomeState | undefined, action: Action): HomeState{
    return reducer(state, action)
}