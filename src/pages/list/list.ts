import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CarService } from '../../services/car.service';
import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [CarService]
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  cars: any[] = [];
  navCtrl: NavController;
  service: CarService;

  constructor(navCtrl: NavController, service: CarService) {
    this.navCtrl = navCtrl;
    this.service = service;
    service.getAll()
    .then(cars => {
      Object.assign(this.cars, cars);
    })
    .catch(e => console.log(e));
    // If we navigated to this page, we will have an item available as a nav param
    //this.selectedItem = navParams.get('item');
  }

  select(car) {
    this.navCtrl.push(DetailPage, {
      car: car
    });
  }
}
