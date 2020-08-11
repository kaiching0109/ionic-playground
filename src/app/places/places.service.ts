import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, delay, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>(
    [
      new Place(
        'p1',
        'Manhattan Mansion',
        'In the heart of New York City.',
        'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg',
        149.99,
        new Date('2019-01-01'),
        new Date('2019-12-31'),
        'abc'
      ), 
      new Place(
        'p2',
        'L\' Amour Toujours',
        'A romantic place in Paris!',
        'https://static.amazon.jobs/locations/7/thumbnails/Paris_-_Thumbnail.jpg?1454183453',
        189.99,
        new Date('2019-01-01'),
        new Date('2019-12-31'),
        'abc'
      ), 
      new Place(
        'p3',
        'The Foggy Palace',
        'Not your average city trip!',
        'https://favim.com/orig/201106/28/castle-fog-foggy-hawarden-castle-mist-Favim.com-86047.jpg',
        99.99,
        new Date('2019-01-01'),
        new Date('2019-12-31'),
        'abc'
      )
    ]
  );

  get places() {
    return this._places.asObservable();
  }
  
  constructor(private authService: AuthService) { }

  getPlace(placeId: string) {
    return this.places.pipe(take(1), map(places => {
      return {...places.find(p => p?.id === placeId)}
    }))
  }

  addPlace(title: string, description: string, price: number, dateFrom: Date, dateTo: Date){
    const newPlace = new Place(Math.random().toString(), title, description, "https://favim.com/orig/201106/28/castle-fog-foggy-hawarden-castle-mist-Favim.com-86047.jpg", price, dateFrom, dateTo, this.authService.userId);
    return this.places.pipe(take(1), delay(1000), tap(places => { this._places.next([...places, newPlace]) }))
  }
}
