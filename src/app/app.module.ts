import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FlagComponent } from './pages/flag/flag.component';
import { CountryComponent } from './components/country/country.component';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';

const dbConfig: DBConfig = {
  name: 'countriesDB',
  version: 1,
  objectStoresMeta: [{
    store: 'countries',
    storeConfig: {keyPath: 'id', autoIncrement: true},
    storeSchema: [
      {name: 'countryData', keypath: 'countryData', options: { unique: false}},
      // {name: 'last_name', keypath: 'last_name', options: { unique: false}},
      // {name: 'profile_photo', keypath: 'profile_photo', options: { unique: false}},
      // {name: 'email', keypath: 'email', options: { unique: true}}
    ]
  }]
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FlagComponent,
    CountryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
