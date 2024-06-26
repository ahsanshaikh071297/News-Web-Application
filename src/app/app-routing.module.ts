import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CategoryNewsComponent } from './components/category-news/category-news.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'serach-results', component: SearchResultComponent },
  { path: 'category/:categoryName', component: CategoryNewsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
