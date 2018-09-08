import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule, MatDialogModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarcodeComponent } from './components/barcode/barcode.component';
import { BarcodeService } from './services/barcode.service';
import { MainComponent } from './components/main/main.component';
import { ImageCaptureComponent } from './components/image-capture/image-capture.component';
import { ItemLookupComponent } from './components/item-lookup/item-lookup.component';
import { ItemDetailInfoComponent } from './components/item-detail-info/item-detail-info.component';
import { UserSignInComponent } from './components/user-sign-in/user-sign-in.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { GeoLocationService } from './services/geo-location.service';
import { ImageRecognitionService } from './services/image-recognition.service';
import { MediaService } from './services/media.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BarcodeComponent,
    MainComponent,
    ImageCaptureComponent,
    ItemLookupComponent,
    ItemDetailInfoComponent,
    UserSignInComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [
    BarcodeService,
    GeoLocationService,
    ImageRecognitionService,
    MediaService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    MainComponent
  ]
})
export class AppModule { }
