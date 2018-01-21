import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from '../database/database';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { NewPage } from '../pages/new/new';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = null;
  dbProvider: DatabaseProvider;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, dbProvider: DatabaseProvider) {
    this.dbProvider = dbProvider;
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Novo', component: NewPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.dbProvider.createDatabase()
        .then(() => {
          this.openHomePage(this.splashScreen);
        })
        .catch(() => {
          this.openHomePage(this.splashScreen);
        });
    });
  }

  openHomePage(splashScreen: SplashScreen){
    this.splashScreen.hide();
    this.rootPage = HomePage;
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
