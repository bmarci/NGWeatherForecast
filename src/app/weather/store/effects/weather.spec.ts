import { TestBed } from '@angular/core/testing';
import { GetWeatherEffect } from './weather';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState, WeatherState } from '../reducers/weather';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, throwError } from 'rxjs';
import { LoadWeather, LoadWeatherFailed, LoadWeatherSuccess, WeatherAction } from '../actions/weather';
import { WeatherService } from '../../weather.service';
import { TestScheduler } from 'rxjs/testing';
import * as testResponse from '../test-response.json';

describe('Effect test', () => {
  let weatherService = jasmine.createSpyObj('weatherService', [
    'searchWeatherForCity'
  ], ['city']);

  let effects: GetWeatherEffect;
  let actions: Observable<WeatherAction>;
  let store: MockStore<WeatherState>;
  let testScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetWeatherEffect,
        provideMockStore({ initialState }),
        provideMockActions(() => actions),
        { provide: WeatherService, useValue: weatherService },
      ]
    });

    effects = TestBed.inject(GetWeatherEffect);
    store = TestBed.inject(MockStore);
    store.setState(initialState);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be true', () => {
    expect(true).toBe(true);
  })

  it('should dispatch LoadWeatherSuccess with payload on success', () => {
    const action = new LoadWeather({ city: 'Budapest' });
    const result = new LoadWeatherSuccess(testResponse);

    testScheduler.run(({ hot, cold, expectObservable }) => {
      actions = hot('-a', { a: action });
      const response = cold('-b|', { b: testResponse })
      weatherService.searchWeatherForCity.and.returnValue(response)

      expectObservable(effects.loadWeather).toBe('--b', { b: result })
    });
  })
/*
  it('should dispatch LoadWeatherFailed with error code on failure', () => {
    const errorResp = { cod: '404', message: 'Test error' };
    const action = new LoadWeather({ city: 'Budapest' });
    const result = new LoadWeatherFailed(errorResp);

    testScheduler.run(({ hot, cold, expectObservable }) => {
      actions = hot('-a', { a: action });
      const response = cold('-b|', { b: errorResp })
      weatherService.searchWeatherForCity.and.returnValue(throwError(response));

      expectObservable(effects.loadWeather).toBe('--b', { b: result })
    });
  })*/
})
