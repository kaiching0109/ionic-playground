import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormControlName, Validators } from '@angular/forms';
import { PlacesService } from '../../places.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {

  form: FormGroup;

  constructor(private placeService: PlacesService, private router: Router, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      price: new FormControl({
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(1)]
      }),
      dateFrom: new FormControl({
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateTo: new FormControl({
        updateOn: 'blur',
        validators: [Validators.required]
      })
    })
  }

  onCreateOffer() {
    if(!this.form.valid) return
    else {
      this.loadingCtrl.create({message: 'Creating place...'})
        .then(loadingEl => {
          loadingEl.present();
          const { title, description, price, dateFrom, dateTo } = this.form.value;
          this.placeService.addPlace(title, description, +price, new Date(dateFrom), new Date(dateTo)).subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(['/places/tabs/offers'])
          })
        })
    }
  }
}
