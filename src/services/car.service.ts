import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';
import { AlertController } from 'ionic-angular';

@Injectable()
export class CarService {

  db: DatabaseProvider;
  alertCtrl: AlertController;

  constructor(db: DatabaseProvider, alertCtrl: AlertController) {
    this.db = db;
    this.alertCtrl = alertCtrl
  }

  insert(car: Car): Promise<Car> {
    return this.db.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into cars (model, year, price, power, alreadyMadeEngine, alreadyHit, fuel, injectionType, mileager, score) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        let data = [car.model, car.year, car.price, car.power, car.alreadyMadeEngine ? 1 : 0, car.alreadyHit ? 1 : 0, car.fuel, car.injectionType, car.mileager, car.score];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => {
        console.error(e)
        this.alertCtrl.create({
          title: 'Erro!',
          subTitle: e,
          buttons: ['OK']
        });
      });
  }

  update(car: Car): Promise<Car> {
    return this.db.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update cars set model = ?, year = ?, price = ?, power = ?, alreadyMadeEngine = ?, alreadyHit = ?, fuel = ?, injectionType = ?, mileager = ?, score = ? where id = ?';
        let data = [car.model, car.year, car.price, car.power, car.alreadyMadeEngine ? 1 : 0, car.alreadyHit ? 1 : 0, car.fuel, car.injectionType, car.mileager, car.score, car.id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  remove(id: number) {
    return this.db.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from cars where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  get(id: number):  Promise<void | Car>{
    return this.db.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from cars where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let car: Car = new Car();
              Object.assign(car, item); 
              return car;           
            }else{
              return null;
            }            
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  getAll(): Promise<void | Car[]> {
    return this.db.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from cars';

        return db.executeSql(sql, {})
          .then((data: any) => {
            if (data.rows.length > 0) {
              let cars: any[] = [];
              for (let i = 0; i < data.rows.length; i++) {
                let item = data.rows.item(i);
                let car: Car = new Car();
                Object.assign(car, item);
                cars.push(car);
              }

              return cars;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}

export class Car {
  id: number;
  model: string;
  year: number;
  price: number;
  power: string
  alreadyMadeEngine: boolean;
  alreadyHit: boolean;
  fuel: string;
  injectionType: string;
  mileager: number;
  score: number;
}