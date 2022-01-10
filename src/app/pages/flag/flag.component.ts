import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Country, CountriesService } from '../../countries.service';
import { NgxIndexedDBService, IndexDetails } from 'ngx-indexed-db';

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
    this.api.getCountryByName(countryCode).subscribe((countryData) => {
      this.country = countryData.pop();
      console.log(this.country);
      this.test();
    });  
  }

  test(){
    this.dbService.add('countries', {
      countryData: this.country,
    })
    .subscribe((key) => {
      console.log('key: ', key);
      this.getAll();
    });
  }

  getAll(){
    this.dbService.getAll('countries').subscribe((key) => {
      console.log('all:', key);
    })
  }

    // //function to retrive all by index
    // getFromIndexDb(email:any){
    //   let index_detail:IndexDetails = {
    //     indexName: 'email',
    //     order: 'asc'
    //   }
  
    //   //get all data with the email field equal to the email passed
    //   this.dbService.getAllByIndex('coolTable', 'email', IDBKeyRange.only(email))
    //   .subscribe((kpis) => {
    //     console.log(kpis);
    //   })
    // }

}
