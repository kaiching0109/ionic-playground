import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/places/place.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})

export class CreateBookingComponent implements OnInit {

  @Input() selectedPlace: Place;

  constructor(private modalCtl: ModalController) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtl.dismiss(null, 'cancel');
  }

  onBookPlace() {
    this.modalCtl.dismiss({message: 'This is my message!'}, 'confirm');
  }

}
