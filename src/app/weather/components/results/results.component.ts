import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WeatherResult } from '../../../model/weather';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent {
  @Input() weatherResults: WeatherResult[];
  @Input() loading: boolean;
  @Input() error: string;

  constructor() { }
}


