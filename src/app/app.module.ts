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
    NgxIndexedDBModule.forRoot(dbConfig),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
