import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {

  @Output()
  citySearch: EventEmitter<string> = new EventEmitter<string>();

  searchForm = this.formBuilder.group({
    city: '',
  });

  constructor(private formBuilder: FormBuilder) {
  }

  search() {
    const city = this.searchForm.value.city;
    this.citySearch.emit(city);
    this.searchForm.reset();
  }
}
