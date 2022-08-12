import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { IBeer } from 'src/app/entities/IBeer';

import { BeersService } from '../../services/beers.service';

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.css'],
})
export class BeerDetailsComponent implements OnInit {
  beer: IBeer = {
    id: '',
    name: '',
    tagline: '',
    first_brewed: '',
    description: '',
    image_url: '',
    ingredients: {
      malt: [],
      hops: [],
      yeast: '',
    },
  };

  constructor(
    private beersService: BeersService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.getBeer(params['id']);
  }

  getBeer(id: string) {
    this.beersService.getBeer(id).subscribe({
      next: this.handleGetBeerResponse.bind(this),
      error: this.handleError.bind(this),
    });
  }

  handleGetBeerResponse(beer: any) {
    const first_brewed = new Date(beer.first_brewed);
    beer.first_brewed = `${
      first_brewed.getMonth() + 1
    }/${first_brewed.getFullYear()}`;
    this.beer = beer;
  }

  handleError(error: any) {
    console.log(error);
  }
}
