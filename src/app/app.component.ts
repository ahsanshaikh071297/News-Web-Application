import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NewsApiService } from 'src/services/news-api.service';

declare var $: any;



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'news-app';
  countryCode: string;
  top5News: any[] = []; // Array to store top 5 news articles
  currentIndex = 0; // Index of the current image being displayed
  currentImageUrl: string; // URL of the current image
  autoSlideInterval: any; // Interval for auto sliding
  source: any;
  formattedDate: any;
  world_news: string = 'world';
  sort: string = 'popularity';
  filteredworldNews: any[] = [];
  worldNews: any[] = [];
  trendingNews: any[]=[];
  businessNews: any[]=[];
  sportsNews: any[]=[];
  techNews: any[]=[];
  entertainmentNews: any[] =[];
  generalNews: any[];

  constructor(private _api: NewsApiService) { }

  ngOnInit(): void {
    this.getLocation()
    this.startAutoSlide(); // Start auto sliding when component initializes
    this.getDates()
    // this.fetchtrendingNews()
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    clearInterval(this.autoSlideInterval); // Clear the auto slide interval on component destruction
  }

  getDates() {
    // Get today's date
    const today = new Date();

    // Subtract two days from today
    const twoDaysBefore = new Date(today);
    twoDaysBefore.setDate(today.getDate() - 1);

    // Format the date in yyyy-mm-dd format
    this.formattedDate = twoDaysBefore.toISOString().split('T')[0];

    console.log(this.formattedDate); // Output: "2024-03-25"

  }


  getLocation() {
    this._api.getUserLocation().subscribe(resp => {
      console.log(resp.country_code);
      this.countryCode = resp.country_code;
      //  this.getTopHeadlines(); // Call getTopHeadlines() after obtaining countryCode
      this.getTop5Headlines()
      this.fetchtrendingNews()
      this.fetchBusinessNews()
      this.fetchSportsNews()
      this.fetchTechNews()
      this.fetchEntertainmenthNews()
      this.fetchGeneralNews()
    });
  }

  getTop5Headlines() {
    if (this.countryCode) {
      // Assuming your API service method returns an observable with the top headlines
      this._api.fetchTopHeadlinesFromCountry(this.countryCode.toLowerCase()).subscribe(resp => {
        const filteredNews = resp.articles.filter(article => article.urlToImage !== null);
        this.top5News = this.getRandomItems(filteredNews, 5);
        // this.top5News = filteredNews.slice(0, 5);
        console.log(this.top5News);

        this.currentImageUrl = this.top5News[this.currentIndex].urlToImage; // Display the first image initially
        this.title = this.top5News[this.currentIndex].title
        this.source = this.top5News[this.currentIndex].source.name
      });
    } else {
      console.error('Country code not available');
    }
  }

  fetchtrendingNews(){
    this._api.fetchTrendingNews().subscribe(
      response => {
        if (response.result && response.result.response === 'ok' && response.news && response.news.length > 0) {
          // Extract the news array containing 20 news objects
          const newsArray = response.news.reduce((acc: any[], curr: any) => acc.concat(curr.News), []);

          // Randomly select 3 news objects
          const randomNews = this.getRandomItems(newsArray, 3);

          // Store the selected news in newsData array
          this.trendingNews = randomNews;
          console.log(this.trendingNews)
        }
      },
      error => {
        console.error('Error fetching news data:', error);
      }
    )
  }

  fetchBusinessNews(){
    const business = "business"
    this._api.fetchNewsByCategory(business, this.countryCode ).subscribe(resp =>{
      const filterednews = resp.articles.filter(article => article.urlToImage !== null);
      this.businessNews = this.getRandomItems(filterednews, 3);
      console.log(this.businessNews)
    })
  }

  fetchSportsNews(){
    const sport = "sports"
    this._api.fetchNewsByCategory(sport, this.countryCode ).subscribe(resp =>{
      const filterednews = resp.articles.filter(article => article.urlToImage !== null);
      this.sportsNews = this.getRandomItems(filterednews, 6);
      console.log(this.sportsNews)
    })
  }

  fetchTechNews(){
    const tech = "technology"
    this._api.fetchNewsByCategory(tech, this.countryCode ).subscribe(resp =>{
      const filterednews = resp.articles.filter(article => article.urlToImage !== null);
      this.techNews = this.getRandomItems(filterednews, 4);
      console.log(this.techNews)
    })
  }

  fetchEntertainmenthNews(){
    const tech = "entertainment"
    this._api.fetchNewsByCategory(tech, this.countryCode ).subscribe(resp =>{
      const filterednews = resp.articles.filter(article => article.urlToImage !== null);
      this.entertainmentNews = this.getRandomItems(filterednews, 5);
      console.log(this.entertainmentNews)
    })
  }
  fetchGeneralNews(){
    const general = "general"
    this._api.fetchNewsByCategory(general, this.countryCode ).subscribe(resp =>{
      this.generalNews = this.getRandomItems(resp.articles, 6);
      console.log(this.generalNews)
    })
  }

  getRandomItems(array: any[], count: number): any[] {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  nextImage(): void {
    if (this.currentIndex < this.top5News.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Wrap around to the first image if at the end
    }
    this.currentImageUrl = this.top5News[this.currentIndex].urlToImage;
    this.title = this.top5News[this.currentIndex].title
    this.source = this.top5News[this.currentIndex].source.name
  }

  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextImage();
    }, 4000); // Slide every 4 seconds (4000 milliseconds)
  }

  stopAutoSlide(): void {
    clearInterval(this.autoSlideInterval); // Stop auto sliding
  }

  previousImage(): void {
    this.currentIndex = (this.currentIndex - 1 + this.top5News.length) % this.top5News.length;
    this.currentImageUrl = this.top5News[this.currentIndex].urlToImage;
  }


}
