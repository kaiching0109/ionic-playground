import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  place: Place;

  constructor(private actionSheetCtl: ActionSheetController,private navCtl: NavController, private route: ActivatedRoute, private placesService: PlacesService, private modalCtl: ModalController){
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
    this.actionSheetCtl.create({
      header: 'Choose an Action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => { this.openBookingModal('select') }
        },
        {
          text: 'Random Date',
          handler: () => { this.openBookingModal('random') }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actionSheetEl => {
      actionSheetEl.present()
    })
  }

  openBookingModal(mode: 'select' | 'random') {
    this.modalCtl.create({
      component: CreateBookingComponent, 
      componentProps: { selectedPlace: this.place }
    }).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    }).then(resultData => {
      console.log(resultData.role, resultData.data)
      if(resultData.role === 'confirm') console.log('BOOKED!!!!')
    })
  }
}
