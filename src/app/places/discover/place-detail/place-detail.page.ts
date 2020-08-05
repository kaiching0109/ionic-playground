import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  place: Place;

  constructor(private navCtl: NavController, private route: ActivatedRoute, private placesService: PlacesService){
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      const placeId = paramMap.get('placeId');
      if(!placeId) this.navCtl.navigateBack('/places/tabs/discovery')
      else this.place = this.placesService.getPlace(placeId);
    })
  }

  onBookpalce() {
    //this.router.navigate('/places/tabs/discover')
    this.navCtl.navigateBack('/places/tabs/discover');

  }

}
