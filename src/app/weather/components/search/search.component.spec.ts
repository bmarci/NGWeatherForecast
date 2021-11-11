import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SearchComponent } from './search.component';
import { FormBuilder } from '@angular/forms';
import { WeatherService } from '../../weather.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let formBuilder: FormBuilder = jasmine.createSpyObj('formBuilder', [
    'searchWeatherForCity'
  ], ['city']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [FormBuilder]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit on citySearch', () => {
    component.searchForm.value.city = 'London';
    spyOn(component.citySearch, 'emit').and.callFake(() => {});
    component.search();
    expect(component.citySearch.emit).toHaveBeenCalledWith('London');
  })

  it('should reset the model on citySearch', () => {
    component.searchForm.value.city = 'London';
    spyOn(component.citySearch, 'emit').and.callFake(() => {});
    spyOn(component.searchForm, 'reset').and.callFake(() => {});
    component.search();
    expect(component.searchForm.reset).toHaveBeenCalled();
  })
});
