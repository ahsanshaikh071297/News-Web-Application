import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  // private apiKey = 'd727ae93229e4dd183a936ea16bc8f65'; // Replace 'YOUR_API_KEY' with your actual API key OUTLOOK
  private apiKey = 'cf7d33724ba44393871e3062a95bf7ab'; // Replace 'YOUR_API_KEY' with your actual API key GMAIL
  private apiUrl = 'https://newsapi.org/v2';

  private locationKey = 'c24304b9c7294647aee525c69bfa26ff'
  private locationUrl = 'https://ipgeolocation.abstractapi.com/v1/?api_key=' + this.locationKey

  private rapidUrl = 'https://news67.p.rapidapi.com/v2/trending';
  private searchUrl = 'https://news67.p.rapidapi.com/v2/topic-search';
  
	private options = {
    headers: new HttpHeaders({
      // 'X-RapidAPI-Key': 'ed9b384d60msh9985f18f378ab9dp15423ajsncb686e87e938', //google
      // 'X-RapidAPI-Key': 'e48e1723e4msh1cc7058612a9ec0p19913cjsn526d9ef23678', //outlook
      'X-RapidAPI-Key': 'f3225e27admsh7a09cc494869a9ep1faf34jsn8660ae58b70c', //google 2
      'X-RapidAPI-Host': 'news67.p.rapidapi.com'
    })
  };

  private rapidUrlBusiness = 'https://google-news13.p.rapidapi.com/business?lr=';
	private optionsGoogle = {
    headers: new HttpHeaders({
      'X-RapidAPI-Key': 'ed9b384d60msh9985f18f378ab9dp15423ajsncb686e87e938',
      'X-RapidAPI-Host': 'google-news13.p.rapidapi.com'
    })
  };

  constructor(private http: HttpClient) { }

  getUserLocation (){
    const url = `${this.locationUrl}`
    return this.http.get<any>(url)
  }

  fetchTrendingNews(){
    return this.http.get<any>(this.rapidUrl, this.options)
  }

  getBusinessNews(category: string, country: string ){
    const url = `${this.apiUrl}/top-headlines?country=${country}&category=${category}&apiKey=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  fetchTopHeadlinesFromCountry(country: string): Observable<any> {
    const url = `${this.apiUrl}/top-headlines?country=${country}&apiKey=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  fetchNewsByCategory(category: string, country: string): Observable<any> {
    const url = `${this.apiUrl}/top-headlines?country=${country}&category=${category}&apiKey=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  searchNewsByKeyword(keyword: string): Observable<any> {
    const url = `${this.searchUrl}?languages=en&search=${keyword}`;
    return this.http.get<any>(url, this.options);
  }
}
