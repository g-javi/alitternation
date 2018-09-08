import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule, MatDialogModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarcodeComponent } from './components/barcode/barcode.component';
import { BarcodeService } from './services/barcode.service';

@NgModule({
  declarations: [
    AppComponent,
    BarcodeComponent
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
    MatDialogModule
  ],
  providers: [
    BarcodeService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    BarcodeComponent
  ]
})
export class AppModule { }
