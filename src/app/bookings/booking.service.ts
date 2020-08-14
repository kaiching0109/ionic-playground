import {  Injectable } from '@angular/core';
import { Booking } from './booking.module';
import { BehaviorSubject } from 'rxjs';
import { take, tap, delay, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

interface BookingData {
    bookedFrom: string;
    bookedTo: string;
    firstName: string;
    lastName: string;
    guestNumber: number;
    placeId: string;
    placeImage: string;
    placeTitle: string;
    userId: string;
}

@Injectable({providedIn: 'root'})
export class BookingService {
    private _bookings = new BehaviorSubject<Booking []>([]);
    isLoading: boolean = false;

    /***
     *  {
            id: 'xyz',
            placeId: 'p1',
            placeTitle: 'Manhattan Mansion',
            guestNumber: 2,
            userId: 'abc'
        }
     */

    constructor(private authService: AuthService, private http: HttpClient) {
    }

    get bookings() {
        return this._bookings.asObservable()
    }

    fetchingBookings() {
        this.isLoading = true;
        return this.http.get<{[name: string]: BookingData}>(`https://ionic-first-app-6f99b.firebaseio.com/bookings.json?orderBy="userId"&equalTo="${this.authService.userId}"`).pipe(
            map(resData => {
                return Object.keys(resData).map(key => {
                    const content = resData[key];
                    return new Booking(key, content.placeId, content.userId, content.placeTitle, content.placeImage,
                        content.firstName, content.lastName, content.guestNumber, new Date(content.bookedFrom), 
                        new Date(content.bookedTo))
                    
                })
            }),
            tap(resData => {
                this.isLoading = false;
                this._bookings.next(resData)
            })
        )
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
        let id;
        return this.http.post<{name: string}>('https://ionic-first-app-6f99b.firebaseio.com/bookings.json', {...newBooking, id: null})
        .pipe(
            switchMap(resData => { 
            id = resData?.name;
              return this.bookings; 
            }),
            take(1),
            tap(bookings => {
              this._bookings.next([...bookings, {...newBooking, id }])
            })
        )
        
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
        return this.http.delete(`https://ionic-first-app-6f99b.firebaseio.com/bookings/${bookingId}.json`).pipe(
            switchMap(() => this.bookings),
            take(1),
            tap(bookings => {
                this._bookings.next(
                    bookings.filter(booking => booking?.id !== bookingId)
                )
            })
        )
    }
}