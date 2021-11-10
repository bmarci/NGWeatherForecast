import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getErrorInfo, getFilteredWeatherInfo, getLoadingInfo, LoadWeather, WeatherState } from './store';
import { WeatherResult } from '../model/weather';


@Component({
  selector: 'app-weather',
  template: `
    <app-search (citySearch)="citySearch($event)"></app-search>
    <app-results [weatherResults]="weatherResults" [loading]="loading" [error]="error"></app-results>
  `
})
export class WeatherContainer implements OnInit{
  weatherResults: WeatherResult[];
  loading: boolean;
  error: string;

  constructor(private store: Store<WeatherState>) {
    this.loading = false;
    this.weatherResults = [];
    this.error = '';
  }

  ngOnInit() {
    this.store.select<WeatherResult[]>(getFilteredWeatherInfo).subscribe(state => {
      this.weatherResults = state;
    })
    this.store.select<boolean>(getLoadingInfo).subscribe(state => {
      this.loading = state;
    })
    this.store.select<string>(getErrorInfo).subscribe(state => {
      this.error = state;
    })
  }

  citySearch(city) {
    this.store.dispatch(new LoadWeather({city}));
  }
}
