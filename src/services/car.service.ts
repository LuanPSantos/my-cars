import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class CarService {

  db: DatabaseProvider;

  constructor(db: DatabaseProvider) {
    this.db = db;
  }

  insert(car: Car) {
    return this.db.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into cars (model, year, price, power, alreadyMadeEngine, alreadyHit, fuel, injectionType, mileager, score) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        let data = [car.model, car.year, car.price, car.power, car.alreadyMadeEngine ? 1 : 0, car.alreadyHit ? 1 : 0, car.fuel, car.injectionType, car.mileager, car.score];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  update(car: Car) {
    return this.db.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update cars set model = ?, year = ?, price = ?, power = ?, alreadyMadeEngine = ?, alreadyHit = ?, fuel = ?, injectionType = ?, mileager = ?, score = ?) where id = ?';
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

  get(id: number) {
    return this.db.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'select * from cars where id = ?';
      let data = [id];

      return db.executeSql(sql, data)
        .then((data: any) => {
          if(data.rows.length > 0){
            let item = data.rows.item(0);
            let car: Car = new Car();
            Object.assign(car, item);
            console.log(car);            
          }
          
          return null;
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }

  getAll() {
    return this.db.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'select * from cars';

      return db.executeSql(sql, {})
        .then((data: any) => {
          if(data.rows.length > 0){
            let cars: any[] = [];
            for(let i = 0; i < data.rows.length; i++){
              let item = data.rows.item(i);
              let car: Car = new Car();
              Object.assign(car, item);
              cars.push(car);
              console.log(cars);           
            }   
            
            return cars;
          }else {
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