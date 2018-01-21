import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CarService, Car } from '../../services/car.service';
import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [CarService]
})
export class ListPage implements OnInit {

  cars: Car[] = [];
  navCtrl: NavController;
  service: CarService;

  constructor(navCtrl: NavController, service: CarService) {
    this.navCtrl = navCtrl;
    this.service = service;
  }

  ngOnInit() {
    this.service.getAll()
      .then(cars => {
        Object.assign(this.cars, cars);
      })
      .catch(e => console.log(e));
  }

  select(id: number) {
    this.navCtrl.push(DetailPage, {
      id: id
    });
  }
}
