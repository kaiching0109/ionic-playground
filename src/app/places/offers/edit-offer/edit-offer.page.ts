import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { NavController } from '@ionic/angular';
import { Place } from '../../place.model';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {

  place: Place;
  form: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private navCtl: NavController, private placesService: PlacesService) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(paramMap => {
      const placeId = paramMap.get('placeId');
      if(!placeId) this.navCtl.navigateBack('/places/tabs/offers')
      else{
        this.place = this.placesService.getPlace(placeId);
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
      } 
    })
  }


  onEditSubmit() {
    if(!this.form.valid) return
    else {
      
    }
  }
}
