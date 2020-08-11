import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { NavController } from '@ionic/angular';
import { Place } from '../../place.model';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {

  place: Place;
  form: FormGroup;
  placeSub: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private navCtl: NavController, private placesService: PlacesService) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(paramMap => {
      const placeId = paramMap.get('placeId');
      if(!placeId) this.navCtl.navigateBack('/places/tabs/offers')
      else{
        this.placeSub = this.placesService.getPlace(placeId).subscribe(place => { 
          this.place = place; 
          this.form = new FormGroup({
            title: new FormControl(this.place?.title, {
              updateOn: 'blur',
              validators: [Validators.required]
            }),
            description: new FormControl(this.place?.description, {
              updateOn: 'blur',
              validators: [Validators.required, Validators.maxLength(180)]
            }),
            price: new FormControl(this.place?.price ,{
              updateOn: 'blur',
              validators: [Validators.required, Validators.minLength(1)]
            })
          })
        })
      } 
    })
  }

  ngOnDestroy() {
    if(this.placeSub) this.placeSub.unsubscribe()
  }

  onEditSubmit() {
    if(!this.form.valid) return
    else {
      
    }
  }
}
