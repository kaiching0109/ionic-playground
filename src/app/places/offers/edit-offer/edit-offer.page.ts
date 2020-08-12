import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PlacesService } from "../../places.service";
import { NavController, LoadingController, AlertController } from "@ionic/angular";
import { Place } from "../../place.model";
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-edit-offer",
  templateUrl: "./edit-offer.page.html",
  styleUrls: ["./edit-offer.page.scss"],
})
export class EditOfferPage implements OnInit, OnDestroy {
  place: Place;
  form: FormGroup;
  placeSub: Subscription;
  isLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtl: NavController,
    private placesService: PlacesService,
    private loadingCtl: LoadingController,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const placeId = paramMap.get("placeId");
      if (!placeId) this.navCtl.navigateBack("/places/tabs/offers");
      else {
        this.isLoading = true;
        this.placeSub = this.placesService
          .getPlace(placeId)
          .subscribe((place: Place) => {
            console.log({place})
            this.place = place;
            this.form = new FormGroup({
              title: new FormControl(this.place.title, {
                updateOn: "blur",
                validators: [Validators.required],
              }),
              description: new FormControl(this.place.description, {
                updateOn: "blur",
                validators: [Validators.required, Validators.maxLength(180)],
              }),
              price: new FormControl(this.place.price, {
                updateOn: "blur",
                validators: [Validators.required, Validators.minLength(1)],
              }),
            });
            this.isLoading = false;
          }, error => {
            this.alertCtrl.create({
              header: 'An error occured!', 
              message: 'Please could not be fetched. Please try again later.',
              buttons: [{text: 'Okay', handler: () => {
                this.router.navigate(['/places/tabs/offers']);
              }}]
            }).then(alertEl => {
              alertEl.present();
            })
          });
      }
    });
  }

  ngOnDestroy() {
    if (this.placeSub) this.placeSub.unsubscribe();
  }

  onEditSubmit() {
    if (!this.form.valid) return;
    else {
      const { id } = this.place;
      const { title, description } = this.form?.value;
      this.loadingCtl.create({message: `Updating place[${id}]...`})
        .then(loadingEle => {
          loadingEle.present();
          this.placesService.updatePlace(id, title, description).subscribe(() => {
            this.form.reset();
            this.router.navigate(['/places/tabs/offers']);
            loadingEle.dismiss();
          })
        })
    }
  }
}
