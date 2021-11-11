import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  @Output()
  citySearch: EventEmitter<string> = new EventEmitter<string>();

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      city: '',
    });
  }

  search() {
    const city = this.searchForm.value.city;
    this.citySearch.emit(city);
    this.searchForm.reset();
  }
}
