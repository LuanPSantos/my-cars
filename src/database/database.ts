import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) { }

  public getDB() {
    return this.sqlite.create({
      name: 'cars.db',
      location: 'default'
    });
  }

  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        this.createTables(db);
      })
      .catch(e => console.log(e));
  }

  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS cars ( id integer primary key AUTOINCREMENT NOT NULL, model varchar(50), year integer, price integer, power varchar(3), alreadyMadeEngine integer, alreadyHit integer, fuel: varchar(20), injectionType varchar(6), mileager integer, score integer)']])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }
}