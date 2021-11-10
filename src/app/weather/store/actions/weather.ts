import { Action } from '@ngrx/store';
import { Summary, Weather, WeatherError } from '../../../model/weather';

export const LOAD_WEATHER = 'LOAD_WEATHER'
export const LOAD_WEATHER_SUCCESS = 'LOAD_WEATHER_SUCCESS'
export const LOAD_WEATHER_FAILED = 'LOAD_WEATHER_FAILED'

export class LoadWeather implements Action {
  readonly type = LOAD_WEATHER;
  constructor(public payload: Summary) {}
}

export class LoadWeatherSuccess implements Action {
  readonly type = LOAD_WEATHER_SUCCESS;
  constructor(public payload: Weather) {}
}

export class LoadWeatherFailed implements Action {
  readonly type = LOAD_WEATHER_FAILED;
  constructor(public payload: WeatherError) {}
}

export type WeatherAction = LoadWeather | LoadWeatherSuccess | LoadWeatherFailed;
