import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieModule } from 'ngx-cookie';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarcodeComponent } from './components/barcode/barcode.component';
import { ImageCaptureComponent } from './components/image-capture/image-capture.component';
import { ItemDetailInfoComponent } from './components/item-detail-info/item-detail-info.component';
import { ItemLookupComponent } from './components/item-lookup/item-lookup.component';
import { MainComponent } from './components/main/main.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { BarcodeService } from './services/barcode.service';
import { GeoLocationService } from './services/geo-location.service';
import { ImageRecognitionService } from './services/image-recognition.service';
import { MediaService } from './services/media.service';
import { UserService } from './services/user.service';
import { LitterItemsService } from './services/litter-items.service';
import { ItemInfoService } from './services/item-info.service';
import { BinMapComponent } from './components/bin-map/bin-map.component';
import { NewItemFormComponent } from './components/new-item-form/new-item-form.component';

@NgModule({
  declarations: [
    AppComponent,
    BarcodeComponent,
    MainComponent,
    ImageCaptureComponent,
    ItemLookupComponent,
    ItemDetailInfoComponent,
    UserInfoComponent,
    BinMapComponent,
    NewItemFormComponent
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
    FormsModule,
    CookieModule.forRoot()
  ],
  providers: [
    BarcodeService,
    GeoLocationService,
    ImageRecognitionService,
    MediaService,
    UserService,
    LitterItemsService,
    ItemInfoService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    MainComponent
  ]
})
export class AppModule { }
