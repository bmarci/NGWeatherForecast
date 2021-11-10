import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState } from '../reducers/weather';

export const getWeathers = createFeatureSelector<WeatherState>('weather');

export const getFilteredWeatherInfo = createSelector(getWeathers, (state: WeatherState) => {
  return state.weathers;
})

export const getLoadingInfo = createSelector(getWeathers, (state: WeatherState) => {
  return state.loading;
})

export const getErrorInfo = createSelector(getWeathers, (state: WeatherState) => {
  return state.error;
})
