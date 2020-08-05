import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, NavController } from '@ionic/angular';

import { PlaceDetailPageRoutingModule } from './place-detail-routing.module';

import { PlaceDetailPage } from './place-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaceDetailPageRoutingModule
  ],
  declarations: [PlaceDetailPage]
})

export class PlaceDetailPageModule {

  constructor(private navCtl: NavController){

  }

  onBookpalce() {
    //this.router.navigate('/places/tabs/discover')
    this.navCtl.navigateBack('/places/tabs/discover');
  }

}
