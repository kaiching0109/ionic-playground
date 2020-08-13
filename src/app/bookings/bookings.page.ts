import { Component, OnInit, OnDestroy } from '@angular/core';
import { Booking } from './booking.module';
import { BookingService } from './booking.service';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {

  constructor(private bookingService: BookingService, private loadingCtrl: LoadingController) { }

  loadedBookings: Booking[];
  private bookingSub: Subscription;
  isLoading: boolean = false;

  ngOnInit() {
    this.bookingSub = this.bookingService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings;
    })
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.bookingService.fetchingBookings()
      .subscribe(() => {
        this.isLoading = false;
      })
  }

  ngOnDestroy() {
    if(this.bookingSub) this.bookingSub.unsubscribe();
  }

  onCancelBooking(offerId: string, slideEl: IonItemSliding) {
    slideEl.close();
    this.loadingCtrl.create({message: "Canceling Booking..."})
      .then(loadingEl => {
        loadingEl.present()
        this.bookingService.removeBooking(offerId)
          .subscribe(() => {
            loadingEl.dismiss();
          })
      })
    //cancel offerId's offer
  }
}
