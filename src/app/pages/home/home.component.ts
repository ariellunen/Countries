import { Component, OnInit } from '@angular/core';
import { Country, CountriesService } from '../../countries.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchFilter: string;
  source: Country[];
  constructor(private api: CountriesService){
    this.searchFilter = '';
    this.source = [];
  }

  ngOnInit(): void {
    this.api.getAllCountries().subscribe((countries) => {
      //TODO: need to change here to immutable.js
      this.source = countries;
      console.log(countries)
    });
  }

  get countries(){
    return this.source
    ? this.source.filter((country) => 
      this.searchFilter 
      ? country.name.common.toLowerCase().includes(this.searchFilter.toLowerCase()):country
    ) 
    : this.source;
  }
}
