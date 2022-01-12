import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, BehaviorSubject } from 'rxjs';
import { map,delay } from 'rxjs/operators';
import { NgxIndexedDBService } from 'ngx-indexed-db';


export interface Country {
  name: {
    common: string;
  },
  flags: {
    svg: string;
  },
  cca3: string;
}

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private temp$: BehaviorSubject<Country[]>;
  private countryDB$: BehaviorSubject<Country[]>;

  constructor(private http: HttpClient, private dbService: NgxIndexedDBService) {
    this.temp$ = new BehaviorSubject<Country[]>([]);
    this.countryDB$ = new BehaviorSubject<Country[]>([]);
  }

  getAllCountries() {
    if(!this.temp$.observed){  
      this.http.get<Country[]>('https://restcountries.com/v3.1/all')
      .subscribe((countries) =>{
        this.temp$.next(countries)
        let apiCountries = this.temp$.value;
        //TODO: need to reverse this
        let dbCountries = this.countryDB$.value;
        
        console.log(dbCountries)

        let merge = apiCountries.concat(dbCountries);
        merge = merge.filter((v,i,a)=>a.findIndex(t=>(t.cca3 === v.cca3))===i)

        this.temp$.next(merge);
        
      })
    }
    if(!this.countryDB$.observed){
      this.dbService.getAll('countries').subscribe((country: any) => {
        this.countryDB$.next(country);
      })
    }
    console.log(this.temp$);
    return this.temp$;
  }

  getCountryByName(code: string): Observable<Country[]> {
    console.log(this.temp$)

    return this.http.get<Country[]>(`https://restcountries.com/v3.1/alpha/${code}`
    ).pipe(
      map((data: Country[]) => {
        return data;
      })
    );
  }

  addCountry(country:any){
    let i = 0;
    const currentValue = this.temp$.value;
    currentValue.forEach((item) => {
      if(country.cca3 == item.cca3){
        currentValue.splice(i,1);
      }
      i++;
    })
    
    const updateValue = [country, ...currentValue];
    this.temp$.next(updateValue);
  }
}
