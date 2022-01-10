import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

export interface Country{
  name: {
    common: string;
  },
  flags: {
    svg: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  constructor(private http: HttpClient) {}

  getAllCountries() {
    return this.http.get<Country[]>('https://restcountries.com/v3.1/all')
  }

  getCountryByName(name:string) {
    return this.http.get<Country[]>(`https://restcountries.com/v3.1/name/${name}`).pipe(
      map(([res]) => res)
    )
  }
}
