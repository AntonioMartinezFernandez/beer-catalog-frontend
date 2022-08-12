import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BeersService {
  private URL = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  getAllBeers() {
    return this.http.get(`${this.URL}/beer`);
  }

  getBeer(id: string) {
    return this.http.get(`${this.URL}/beer/id/${id}`);
  }

  autocomplete(term: string) {
    return this.http.get(
      `${this.URL}/beer/autocomplete?term=${term.replace(/#/g, '')}`
    );
  }

  search(term: string) {
    return this.http.get(
      `${this.URL}/beer/search?term=${term.replace(/#/g, '')}`
    );
  }

  topTenIngredients() {
    return this.http.get(`${this.URL}/beer/top_ten_ingredients`);
  }
}
