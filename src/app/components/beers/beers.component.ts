import { Component, OnInit } from '@angular/core';

import { BeersService } from '../../services/beers.service';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.css'],
})
export class BeersComponent implements OnInit {
  searchValues = { term: '', termValues: [] };
  beers: any[] = [];
  topTenBeers: any[] = [];

  constructor(private beersService: BeersService) {}

  ngOnInit(): void {
    this.beersService.getAllBeers().subscribe({
      next: this.handleInitResponse.bind(this),
      error: this.handleError.bind(this),
    });
  }

  handleInitResponse(beers: any) {
    this.beers = beers;

    this.stablishTopTenBeers([...beers]);
  }

  selectEvent(item: any) {
    console.log(item);
    this.beersService.search(item).subscribe({
      next: this.handleSearchResponse.bind(this),
      error: this.handleError.bind(this),
    });
  }

  onChangeSearch(val: string) {
    this.beersService.autocomplete(val).subscribe({
      next: this.handleAutocompleteResponse.bind(this),
      error: this.handleError.bind(this),
    });
  }

  handleAutocompleteResponse(terms: any) {
    this.searchValues.termValues = terms;
  }

  handleSearchResponse(resultBeers: any) {
    this.beers = resultBeers;
    this.stablishTopTenBeers([...resultBeers]);
  }

  getBeer(id: string) {
    this.beersService.getBeer(id).subscribe({
      next: this.handleGetBeerResponse.bind(this),
      error: this.handleError.bind(this),
    });
  }

  handleGetBeerResponse(beer: any) {
    console.log(beer);
  }

  handleError(error: any) {
    console.log(error);
  }

  stablishTopTenBeers(beers: any[]) {
    beers.sort(
      (a: any, b: any) => ((b.first_brewed as any) < a.first_brewed) as any
    );

    const topTenBeers: any[] = [];

    for (const beer of beers) {
      const brewed = new Date(beer.first_brewed);
      topTenBeers.push({
        id: beer.id,
        name: beer.name,
        first_brewed: `${brewed.getMonth() + 1}/${brewed.getFullYear()}`,
      });
    }

    this.topTenBeers = topTenBeers.slice(0, 10);
  }
}
