import { Component, OnInit } from '@angular/core';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {


  place: Place

  constructor(private placesService: PlacesService, private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(paramMap => {
      const placeId = paramMap.get('placeId');
      if(placeId) 
        this.place = this.placesService.getPlace(placeId);
    })
  }

}
