import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { WeatherService } from '../../weather.service';
import { LOAD_WEATHER, LoadWeatherFailed, LoadWeatherSuccess } from '../actions/weather';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Summary } from '../../../model/weather';
import { of } from 'rxjs';


@Injectable()
export class GetWeatherEffect {
  constructor(private actions: Actions, private weatherService: WeatherService) {

  }

  @Effect()
  loadWeather = this.actions.pipe(ofType(
    LOAD_WEATHER
  ),
    switchMap((action: any) => {
      return this.weatherService.searchWeatherForCity(action.payload.city).pipe(
        map(weather => {
          return new LoadWeatherSuccess(weather)
        }),
        catchError(error => of(new LoadWeatherFailed(error)))
      )
    }));

}
