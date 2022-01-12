import { Component, OnInit } from '@angular/core';
import * as Immutable from 'immutable';
import { Country, CountriesService } from '../../countries.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchFilter: string;
  source: any;
  constructor(private api: CountriesService){
    this.searchFilter = '';
    this.source = [];
  }

  ngOnInit(): void {
    this.api.getAllCountries().subscribe((countries: any) => {
      this.source = Immutable.List(countries);
    });
  }

  get countries(){
    return this.source
    ? this.source.filter((country:any) => 
      this.searchFilter 
      ? country.name.common.toLowerCase().includes(this.searchFilter.toLowerCase()):country
    ) 
    : this.source;
    
  }
}
