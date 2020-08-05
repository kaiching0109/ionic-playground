import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places = [
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of New York City.',
      'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg',
      149.99
    ), 
    new Place(
      'p2',
      'L\' Amour Toujours',
      'A romantic place in Paris!',
      'https://static.amazon.jobs/locations/7/thumbnails/Paris_-_Thumbnail.jpg?1454183453',
      189.99
    ), 
    new Place(
      'p3',
      'The Foggy Palace',
      'Not your average city trip!',
      'https://favim.com/orig/201106/28/castle-fog-foggy-hawarden-castle-mist-Favim.com-86047.jpg',
      99.99
    )
  ];

  get places() {
    return [...this._places];
  }
  
  constructor() { }

  getPlace(placeId: string) {
    const placeMatched = this._places.find(place => place?.id === placeId)
    if(placeMatched) return {...placeMatched}
    else return null;
  }
}
