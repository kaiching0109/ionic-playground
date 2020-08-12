import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, delay, map, tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const API_URL = "https://ionic-first-app-6f99b.firebaseio.com/offered-places.json";

export interface PlaceData {
  userId: string;
  title: string;
  imageUrl: string;
  price: number;
  description: string;
  availableFrom: string;
  availableTo: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>(
    [
      // new Place(
      //   'p1',
      //   'Manhattan Mansion',
      //   'In the heart of New York City.',
      //   'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg',
      //   149.99,
      //   new Date('2019-01-01'),
      //   new Date('2019-12-31'),
      //   'abc'
      // ), 
      // new Place(
      //   'p2',
      //   'L\' Amour Toujours',
      //   'A romantic place in Paris!',
      //   'https://static.amazon.jobs/locations/7/thumbnails/Paris_-_Thumbnail.jpg?1454183453',
      //   189.99,
      //   new Date('2019-01-01'),
      //   new Date('2019-12-31'),
      //   'abc'
      // ), 
      // new Place(
      //   'p3',
      //   'The Foggy Palace',
      //   'Not your average city trip!',
      //   'https://favim.com/orig/201106/28/castle-fog-foggy-hawarden-castle-mist-Favim.com-86047.jpg',
      //   99.99,
      //   new Date('2019-01-01'),
      //   new Date('2019-12-31'),
      //   'xyz'
      // )
    ]
  );

  get places() {
    return this._places.asObservable();
  }
  
  constructor(private authService: AuthService, private http: HttpClient) { }

  fetchPlaces() {
    return this.http.get<{ [name: string] : PlaceData}>(API_URL)
      .pipe(
        map(places => {
          if(!places) return []
          return <Place []>Object.keys(places).map(key => {
            console.log({key})
            const { availableFrom, availableTo, ...rest } = places[key];
            return new Place(
              key,
              rest.title,
              rest.description,
              rest.imageUrl,
              rest.price,
              new Date(availableFrom), 
              new Date(availableTo),
              rest.userId
            );
          })
        }),
        tap(places => { 
          console.log({places})
          this._places.next(places);
        }),
      )
  }

  getPlace(placeId: string) {
    return this.places.pipe(take(1), map(places => {
      return {...places.find(p => p?.id === placeId)}
    }))
  }

  addPlace(title: string, description: string, price: number, dateFrom: Date, dateTo: Date){
    const newPlace = new Place(Math.random().toString(), title, description, "https://favim.com/orig/201106/28/castle-fog-foggy-hawarden-castle-mist-Favim.com-86047.jpg", price, dateFrom, dateTo, this.authService.userId);
    let generatedId;
    return this.http.post<{name: string}>(API_URL, { ...newPlace, id: null })
      .pipe(
        switchMap(resData => { 
          generatedId = resData?.name;
          return this.places; 
        }),
        take(1),
        tap(places => {
          this._places.next([...places, {...newPlace, id: generatedId}])
        })
      )
  }

  updatePlace(id: string, title: string, description: string) {
    let updatedPlaces: Place[];
    return this.places.pipe(
      take(1), 
      switchMap(places => {
        updatedPlaces = [...places];
        let placeToUpdateIndex = places.findIndex(place => place?.id === id)
        const contetToUpdate = {...updatedPlaces[placeToUpdateIndex], title, description };
        updatedPlaces[placeToUpdateIndex] = contetToUpdate;
        return this.http.put(`https://ionic-first-app-6f99b.firebaseio.com/offered-places/${id}.json`, {...contetToUpdate, id: null})
      }),
      tap(() => {
        this._places.next([...updatedPlaces]);
      })
    )
  }
}
