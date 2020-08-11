import { Component, OnInit, OnDestroy } from "@angular/core";
import { Place } from "../../place.model";
import { PlacesService } from "../../places.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-offer-bookings",
  templateUrl: "./offer-bookings.page.html",
  styleUrls: ["./offer-bookings.page.scss"],
})
export class OfferBookingsPage implements OnInit, OnDestroy {
  placeSub: Subscription;
  place: Place;

  constructor(
    private placesService: PlacesService,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe((paramMap) => {
      const placeId = paramMap.get("placeId");
      if (placeId)
        this.placeSub = this.placesService
          .getPlace(placeId)
          .subscribe((place) => {
            this.place = place;
          });
    });
  }

  ngOnDestroy() {
    if (this.placeSub) this.placeSub.unsubscribe();
  }
}
