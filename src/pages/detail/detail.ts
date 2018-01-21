import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { CarService, Car } from '../../services/car.service';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NewPage } from '../new/new';
import { ListPage } from '../list/list';

@Component({
  selector: 'detail-page',
  templateUrl: 'detail.html',
  providers: [CarService]
})
export class DetailPage implements OnInit {
  navParams: NavParams;
  service: CarService;
  navCtrl: NavController;
  car: Car = {
    id: null,
    model: '',
    year: null,
    price: null,
    power: '',
    alreadyMadeEngine: false,
    alreadyHit: false,
    fuel: '',
    injectionType: '',
    mileager: null,
    score: null
  };

  constructor(navParams: NavParams, navCtrl: NavController, service: CarService) {
    this.navParams = navParams;
    this.service = service;
    this.navCtrl = navCtrl;
  }

  ngOnInit() {
    let id = this.navParams.get('id');
    this.service.get(id).then((car: Car) => {
      Object.assign(this.car, car);
    });
  }

  update() {
    this.navCtrl.setRoot(NewPage, {
      id: this.car.id
    });
  }

  remove() {
    this.service.remove(this.car.id).then(() => {
      this.navCtrl.setRoot(ListPage, {});
    });
  }
}