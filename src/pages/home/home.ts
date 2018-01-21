import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CarService, Car } from '../../services/car.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CarService]
})
export class HomePage implements OnInit {

  navCtrl: NavController;
  service: CarService;
  barChartData: any[] = [
    { data: [], label: 'Sem dados' }
  ];
  barChartLabels: any[] = [];
  hasData = false;

  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  barChartType: string = 'bar';

  barChartLegend: boolean = true;

  constructor(navCtrl: NavController, service: CarService) {
    this.navCtrl = navCtrl;
    this.service = service;
  }

  ngOnInit() {
    this.createCharts();
  }

  createCharts() {
    let barChartData: any[] = [{
      data: [], label: 'Custo x Benefício'
    }];
    let barChartLabels: any[] = [];

    this.service.getAll().then((cars: Car[]) => {
      if (cars.length > 0) {
        cars.forEach(car => {
          barChartLabels.push(car.model);
          barChartData[0].data.push(this.calcularCustoBeneficio(car));
        });
        Object.assign(this.barChartData, barChartData);
        Object.assign(this.barChartLabels, barChartLabels);

        this.hasData = true;
      }
    });
  };

  calcularCustoBeneficio(car: Car): number {
    let hit: number = car.alreadyHit ? 10 : 100;
    console.log('hit: ' + hit);

    let engine_km: number;
    if (car.alreadyMadeEngine) {
      if (car.mileager > 150) {
        engine_km = 90;
      } else {
        engine_km = 70;
      }
    } else {
      if (car.mileager > 140) {
        engine_km = 10;
      } else {
        engine_km = 70;
      }
    }
    console.log('engine_km: ' + engine_km);

    let year: number;
    if (car.year < 1995) {
      year = 30;
    } else if (car.year < 2000) {
      year = 60;
    } else {
      year = 90;
    }
    console.log('year: ' + year);

    let price: number;
    if (car.price <= 5000) {
      price = 100;
    } else if (car.price <= 8000) {
      price = 75;
    } else {
      price = 45;
    }
    console.log('price: ' + price);

    let power: number;
    if (car.power == '1.0') {
      power = 80;
    } else if (car.power == '1.3') {
      power = 80;
    } else if (car.power == '1.4') {
      power = 100;
    } else if (car.power == '1.6') {
      power = 60;
    } else if (car.power == '1.8') {
      power = 30;
    } else {
      power = 10;
    }
    console.log('power: ' + power);

    let fuel_injection: number;
    if (car.fuel == 'ETHANOL') {
      if (car.injectionType == 'MPFI') {
        fuel_injection = 80;
      } else {
        fuel_injection = 40;
      }
    } else if (car.fuel == 'GASOLINE') {
      if (car.injectionType == 'MPFI') {
        fuel_injection = 80;
      } else {
        fuel_injection = 70;
      }
    } else {
      if (car.injectionType == 'MPFI') {
        fuel_injection = 100;
      } else {
        fuel_injection = 80;
      }
    }
    console.log('fuel_injection: ' + fuel_injection);

    let score = car.score * 10;
    console.log('score: ' + score);

    let value = (hit * 2 + engine_km * 5 + year * 1 + price * 3 + power * 3 + fuel_injection * 4 + score * 3) / (2 + 5 + 1 + 3 + 3 + 4 + 3);
    console.log(value);
    return value;
  }
}
