import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsApiService } from 'src/services/news-api.service';
import { UiServiceService } from 'src/services/ui-service.service';

@Component({
  selector: 'app-category-news',
  templateUrl: './category-news.component.html',
  styleUrls: ['./category-news.component.css']
})
export class CategoryNewsComponent implements OnInit {
  category: string;
  articles: any[]=[];
  searchQuery: string = '';
  countryCode: string;

  constructor(private route: ActivatedRoute, private apiService: NewsApiService, private searchService : UiServiceService, private router : Router) { }

  ngOnInit(): void {
    this.getLocation()
    this.route.params.subscribe(params => {
      this.category = params['categoryName'];
      // Call your API service with the selected category
      this.fetchNews()
    });
  }

  navigateToCategory(category: string) {
    this.router.navigate(['/category', category]);
  }

  fetchNews() {
    this.apiService.fetchNewsByCategory(this.category,this.countryCode).subscribe(data =>{
      const filterednews = data.articles.filter(article => article.urlToImage !== null);
      this.articles = filterednews
      console.log(this.articles)
    })
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
   this.countryCode = localStorage.getItem("location")
  }
}
