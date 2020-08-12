import {  Injectable } from '@angular/core';
import { Booking } from './booking.module';
import { BehaviorSubject } from 'rxjs';
import { take, tap, delay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class BookingService {
    private _bookings = new BehaviorSubject<Booking []>([]);

    /***
     *  {
            id: 'xyz',
            placeId: 'p1',
            placeTitle: 'Manhattan Mansion',
            guestNumber: 2,
            userId: 'abc'
        }
     */

    constructor(private authService: AuthService) {
    }

    get bookings() {
        return this._bookings.asObservable()
    }

    addBookings(placeId: string, placeTitle: string, placeImageUrl: string, firstName: string, lastName: string, guestNumber: number, dateFrom: Date, dateTo: Date) {
        const newBooking = new Booking(
            Math.random().toString(),
            placeId,
            this.authService.userId,
            placeTitle,
            placeImageUrl,
            firstName,
            lastName,
            guestNumber,
            dateFrom,
            dateTo
        );
        
        return this.bookings.pipe(
            take(1), 
            delay(1000), 
            tap(places => { 
                places = [...places, newBooking]; 
                this._bookings.next(places)
            })
        )
    }

    updateBooking() {

    }

    removeBooking(bookingId: string) {
        return this.bookings.pipe(take(1), delay(1000), tap(bookings => {
            this._bookings.next(
                bookings.filter(booking => booking?.id !== bookingId)
            )
        }))
    }
}