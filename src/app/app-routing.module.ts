import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlagComponent } from './pages/flag/flag.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
  },
  {
    path:'flag/:countryCode',
    component: FlagComponent,
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
