import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { NavParams } from 'ionic-angular/navigation/nav-params';

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
  car: any = {
    model: '',
    year: '',
    price: '',
    power: '',
    alreadyMadeEngine: false,
    alreadyHit: false,
    fuel: '',
    injectionType: '',
    mileager: '',
    score: ''
  }

  constructor(fb: FormBuilder, service: CarService, navParams: NavParams) {
    this.service = service;
    this.fb = fb;
    this.navParams = navParams;
  }

  ngOnInit() {
    let car = this.navParams.get('car');
    if (car) {
      Object.assign(this.car, car);
    }

    this.createForm();
  }

  save() {
    this.service.insert(this.carForm.value);
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