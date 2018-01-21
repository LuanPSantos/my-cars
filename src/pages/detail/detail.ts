import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { CarService } from '../../services/car.service';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NewPage } from '../new/new';

@Component({
    selector: 'detail-page',
    templateUrl: 'detail.html',
    providers: [CarService]
})
export class DetailPage implements OnInit {
    navParams: NavParams;
    service: CarService;
    navCtrl: NavController;
    car: any = {};
    constructor(navParams: NavParams, navCtrl: NavController, service: CarService) {
        this.navParams = navParams;
        this.service = service;
        this.navCtrl = navCtrl;
    }

    ngOnInit() {
        Object.assign(this.car, this.navParams.get('car'));
        console.log(this.car);
    }

    update(){
        this.navCtrl.setRoot(NewPage, {
            car: this.car
        });
    }
}