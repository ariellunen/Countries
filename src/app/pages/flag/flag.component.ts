import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Country, CountriesService } from '../../countries.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss']
})
export class FlagComponent implements OnInit {
  public country: any = undefined;
  constructor(
    private api: CountriesService, 
    private route: ActivatedRoute,
    private dbService: NgxIndexedDBService
  ) {}

  ngOnInit(): void {
    const countryCode = String(this.route.snapshot.paramMap.get('countryCode'));
    this.api.getCountryByName(countryCode).subscribe((countryData:Country[]) => {
      this.country = countryData.pop();
      console.log(this.country);
      this.addCountry();
    });  
  }

  addCountry(){
    this.dbService.add('countries', {
      countryData: this.country,
    })
    .subscribe((key) => {
      this.api.addCountry(this.country)
    });
  }

}
