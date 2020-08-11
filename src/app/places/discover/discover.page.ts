import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[];
  placeSub: Subscription;

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.placeSub = this.placesService.places.subscribe(places => { 
      console.log({ places })
      this.loadedPlaces = places; 
    })
  }

  ngOnDestroy() {
    if(this.placeSub) this.placeSub.unsubscribe();
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail)
  }

}
