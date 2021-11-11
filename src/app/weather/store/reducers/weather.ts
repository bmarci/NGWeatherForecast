import { Forecast, WeatherResult } from '../../../model/weather';
import { LOAD_WEATHER, LOAD_WEATHER_FAILED, LOAD_WEATHER_SUCCESS, WeatherAction } from '../actions/weather';

export interface WeatherState {
  weathers: WeatherResult[];
  loaded: boolean;
  loading: boolean;
  error: string;
}

export const initialState: WeatherState = {
  weathers: [],
  loaded: false,
  loading: false,
  error: '',
}

export function reducer (state = initialState, action: WeatherAction): WeatherState {
  switch (action.type) {
    case LOAD_WEATHER: {
      return {
        ...state,
        loading: true,
        error: '',
      }
    }
    case LOAD_WEATHER_SUCCESS: {
      console.log(`${JSON.stringify(action.payload)} << action.payload`)
      const newWeather = { city:action.payload.city.name, forecasts: action.payload.list
          .filter((elem, index) => index % 2 === 0) // The list period is 3 hours, we need 6, so keep every second elem
          .slice(0, 4)
          .map(elem => ({ dt: elem.dt, temp: elem.main.temp}))};
      const newWeathers = [...state.weathers, newWeather] as WeatherResult[];
      return {
        ...state,
        weathers: newWeathers,
        loading: false,
        loaded: true,
        error: '',
      }
    }
    case LOAD_WEATHER_FAILED: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.message,
      }
    }
  }
  return state;
}
