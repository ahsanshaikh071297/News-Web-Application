import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsApiService } from 'src/services/news-api.service';
import { UiServiceService } from 'src/services/ui-service.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  searchQuery: string = '';
  results : any
  countryCode: string;
  searchResult: any;

  constructor (private searchService : UiServiceService, private router : Router, private route : ActivatedRoute, private _api : NewsApiService ) {}

  ngOnInit(): void {
    this.getLocation()
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      this.searchService.sendSearchQuery(this.searchQuery);
      // Perform search operation using the query
      console.log(this.searchQuery)
    });
    if (this.searchQuery) {
      this.getSearchQuery()
    }
  }

  onSearch(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value;
  }

  onSearchButtonClick(): void {
    this.searchService.sendSearchQuery(this.searchQuery);
    this.router.navigate(['/serach-results'], { queryParams: { q: this.searchQuery } });
  }

  getLocation() {
    this._api.getUserLocation().subscribe(resp => {
      console.log(resp.country_code);
      this.countryCode = resp.country_code;
    });
  }

  getSearchQuery() {
    this._api.searchNewsByKeyword(this.searchQuery).subscribe( resp=>{
      this.searchResult = resp
      console.log(resp)
    })
  }

}


