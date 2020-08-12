import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[];
  placeSub: Subscription;
  relevantPlaces: Place[];
  listedLoadedPlaces: Place[];
  isLoading: boolean = false;

  constructor(private placesService: PlacesService, private authService: AuthService) { }
  ngOnInit() {
    this.placeSub = this.placesService.places.subscribe(places => { 
      this.loadedPlaces = places; 
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = [...this.relevantPlaces];
    })
  }

  ngOnDestroy() {
    if(this.placeSub) this.placeSub.unsubscribe();
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    if(event.detail.value === 'all') {
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = [...this.loadedPlaces];
    }  else {
      this.relevantPlaces = this.loadedPlaces.filter(place => place?.userId !== this.authService.userId)
      this.listedLoadedPlaces = [...this.relevantPlaces];
    }
  }
}
