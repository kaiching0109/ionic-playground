import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { NavController } from '@ionic/angular';
import { Place } from '../../place.model';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {

  place: Place;

  constructor(private activatedRoute: ActivatedRoute, private navCtl: NavController, private placesService: PlacesService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const placeId = paramMap.get('placeId');
      if(!placeId) this.navCtl.navigateBack('/places/tabs/offers')
      else this.place = this.placesService.getPlace(placeId)
    })
  }

}
