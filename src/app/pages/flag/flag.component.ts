import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Country, CountriesService } from '../../countries.service';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss']
})
export class FlagComponent implements OnInit {
  country : Country[] = [];
  constructor(private api: CountriesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //TODO: cant get to params.flag
    this.route.params.subscribe(params => {
      // this.api.getCountryByName(params)
      console.log(params);
      
    })
  }

}
