import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarService, Car } from '../../services/car.service';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { DetailPage } from '../detail/detail';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-new',
  templateUrl: './new.html',
  providers: [CarService]
})
export class NewPage implements OnInit {

  carForm: FormGroup;
  service: CarService;
  fb: FormBuilder;
  navParams: NavParams;
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

  constructor(fb: FormBuilder, service: CarService, navParams: NavParams, navCtrl: NavController) {
    this.service = service;
    this.fb = fb;
    this.navParams = navParams;
    this.navCtrl = navCtrl;
  }

  ngOnInit() {
    let id = this.navParams.get('id');
    if (id) {
      this.service.get(id).then((car: Car) => {
        Object.assign(this.car, car);
      });
    }

    this.createForm();
  }

  save() {
    if (this.car.id) {
      this.carForm.value.id = this.car.id;
      this.service.update(this.carForm.value).then((car: Car) => {
        this.navCtrl.setRoot(ListPage);
      });
    } else {
      this.service.insert(this.carForm.value)
        .then((car: Car) => {
          this.navCtrl.setRoot(ListPage);
        });
    }
  }

  createForm() {
    this.carForm = this.fb.group({
      model: [this.car.model],
      price: [this.car.price],
      year: [this.car.year],
      power: [this.car.power],
      alreadyMadeEngine: [this.car.alreadyMadeEngine],
      alreadyHit: [this.car.alreadyHit],
      fuel: [this.car.fuel],
      injectionType: [this.car.injectionType],
      mileager: [this.car.mileager],
      score: [this.car.score]
    });
  }
}