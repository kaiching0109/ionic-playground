import { Component, OnInit } from '@angular/core';
import { Booking } from './booking.module';
import { BookingService } from './booking.service';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  constructor(private bookingService: BookingService) { }

  loadedBookings: Booking[];

  ngOnInit() {
    this.loadedBookings = this.bookingService.bookings; 
  }

  onCancelBooking(offerId: string, slideEl: IonItemSliding) {
    slideEl.close()
    //cancel offerId's offer
  }
}
