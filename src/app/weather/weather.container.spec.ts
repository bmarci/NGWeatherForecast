import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WeatherContainer } from './weather.container';
import { Store } from '@ngrx/store';
import { getErrorInfo, getFilteredWeatherInfo, getLoadingInfo, initialState, LoadWeather } from './store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';

describe('WeatherContainer', () => {
  let component: WeatherContainer;
  let fixture: ComponentFixture<WeatherContainer>;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherContainer],
      imports: [],
      providers: [provideMockStore( { initialState, selectors: [
          { selector: getFilteredWeatherInfo, value: [] },
          { selector: getLoadingInfo, value: [] },
          { selector: getErrorInfo, value: [] }
        ] } )],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(WeatherContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(store, 'dispatch').and.callFake(() => {});
    spyOn(store, 'select').and.callFake(() => new Observable());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch LoadWeather', () => {
    component.citySearch('London');
    expect(store.dispatch).toHaveBeenCalledWith(new LoadWeather({ city: 'London' }))
  })

  it('should call the 3 selectors', () => {
    component.ngOnInit();
    expect(store.select).toHaveBeenCalledTimes(3);
  })
});
