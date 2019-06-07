import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
// import { PageNotFoundComponent } from './';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: 'lista', component: ListComponent },
  { path: '**', component: HomeComponent },
  // { path: 'path3', component: Name3Component },
  // { path: 'path4', component: Name4Component },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
