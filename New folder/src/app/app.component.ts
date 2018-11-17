import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav,Menu } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavdemoPage, BasicPage } from '../pages/navdemo/navdemo';
import { BasicPage1 } from '../pages/popoverdemo/popoverdemo';
import { RangedemoPage } from '../pages/rangedemo/rangedemo';
import { SearchbardemoPage } from '../pages/searchbardemo/searchbardemo';
import { SegmentdemoPage } from '../pages/segmentdemo/segmentdemo';
import { SelectdemoPage } from '../pages/selectdemo/selectdemo';
import { SlidedemoPage } from '../pages/slidedemo/slidedemo';
import { TabdemoPage, BasicPage2 } from '../pages/tabdemo/tabdemo';
import { ToastdemoPage } from '../pages/toastdemo/toastdemo';
import { ToggledemoPage } from '../pages/toggledemo/toggledemo';
import { ToolbarPage } from '../pages/toolbar/toolbar';
import { PageOne } from '../pages/menudemo/menudemo';
import { ClearbuttondemoPage } from '../pages/clearbuttondemo/clearbuttondemo';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import {Camera,CameraOptions} from '@ionic-native/camera';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;


  // make HelloIonicPage the root (or first) page
  rootPage = HelloIonicPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public camera:Camera ,
    public backgroundGeolocation: BackgroundGeolocation
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ankur', component: HelloIonicPage },
      { title: 'My First List ', component: ListPage },
      {title:'nav demo',component:BasicPage},
      {title:'popover demo',component:BasicPage1},
      {title:'range demo ',component:RangedemoPage},
      {title:'search bar demo',component:SearchbardemoPage},
      {title:'segment demo ',component:SegmentdemoPage},
      {title:'Select demo',component:SelectdemoPage},
      {title:'slide demo',component:SlidedemoPage},
      {title:'tab demo',component:BasicPage2},
      {title:'toast demo',component:ToastdemoPage},
      {title:'toggle demo',component:ToggledemoPage},
      {title:'toolbar demo',component:ToolbarPage},
      {title:'menu demo',component:PageOne},
      {title:'button demo',component:ClearbuttondemoPage}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
   //   this.statusBar.styleDefault();
    //  this.splashScreen.hide();
    this.menu.open();
  //  this.menu.swipeEnable(false);
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
   // this.menu.close();
    // navigate to the new page if it is not the current page
    this.menu.open();
    this.nav.setRoot(page.component);
  }

  myphoto:any;
 TakePhoto()
 {
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  
  this.camera.getPicture(options).then((imageData) => {
   // imageData is either a base64 encoded string or a file URI
   // If it's base64 (DATA_URL):
   this.myphoto = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {
   // Handle error
  });

 }
 loc:any;
 BackGeo()
 {
  const config: BackgroundGeolocationConfig = {
    desiredAccuracy: 10,
    stationaryRadius: 20,
    distanceFilter: 30,
    debug: true, //  enable this hear sounds for background-geolocation life-cycle.
    stopOnTerminate: false, // enable this to clear background location settings when the app terminates
};

this.backgroundGeolocation.configure(config)
.subscribe((location: BackgroundGeolocationResponse) => {
this.loc=location;
console.log(location);

// IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
// and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
// IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
//this.backgroundGeolocation.finish(); // FOR IOS ONLY

});

// start recording location
this.backgroundGeolocation.start();

// If you wish to turn OFF background-tracking, call the #stop method.
this.backgroundGeolocation.stop();
 }

 
}
