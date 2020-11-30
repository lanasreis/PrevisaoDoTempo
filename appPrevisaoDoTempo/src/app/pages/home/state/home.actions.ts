import { createAction, props } from "@ngrx/store";
import { Bookmark } from "src/app/shared/models/bookmark.model";

export const loadCurrentWeather = createAction(
    '[Home] Load Current Wheather',
    props<{ query: string }>(),
)

export const loadCurrnetWeatherSuccess = createAction(
    '[Weather API] Load Current Weather Success',
    props<{ entity: any }>()
);

export const loadCurrnetWeatherFail = createAction(
    '[Weather API] Load Current Weather Fail',
);

export const toggleBookmark = createAction(
    '[Home] Toggle Bookmark',
    props< {entity: Bookmark} >(),
)