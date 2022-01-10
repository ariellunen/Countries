import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Country{
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
  constructor(private http: HttpClient) {}

  getAllCountries() {
    return this.http.get<Country[]>('https://restcountries.com/v3.1/all')
  }

  getCountryByName(code:string) {
    return this.http.get<Country[]>(`https://restcountries.com/v3.1/alpha/${code}`);
  }
}
