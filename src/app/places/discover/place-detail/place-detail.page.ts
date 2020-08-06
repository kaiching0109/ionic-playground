import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { NavController, ModalController } from '@ionic/angular';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  place: Place;

  constructor(private navCtl: NavController, private route: ActivatedRoute, private placesService: PlacesService, private modalCtl: ModalController){
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      const placeId = paramMap.get('placeId');
      if(!placeId) this.navCtl.navigateBack('/places/tabs/discovery')
      else this.place = this.placesService.getPlace(placeId);
    })
  }

  onBookplace() {
    //this.router.navigate('/places/tabs/discover')
    // this.navCtl.navigateBack('/places/tabs/discover');
    this.modalCtl.create({component: CreateBookingComponent, componentProps: { selectedPlace: this.place }})
      .then(modalEle => {
        modalEle.present();
        return modalEle.onDidDismiss();
      })
      .then(resultData => {
        console.log(resultData.data, resultData.role)
        if(resultData.role === 'confirm') {
          console.log('BOOK!')
        }
      })
  }

}
