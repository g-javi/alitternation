import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ImageCaptureComponent } from './components/image-capture/image-capture.component';
import { ItemLookupComponent } from './components/item-lookup/item-lookup.component';
import { ItemDetailInfoComponent } from './components/item-detail-info/item-detail-info.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserGuard } from './guards/user.guard';
import { BinMapComponent } from './components/bin-map/bin-map.component';
import { DepotMapComponent } from "./components/depot-map/depot-map.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    pathMatch: 'full'
  },
  {
    path: 'image-capture',
    component: ImageCaptureComponent,
  },
  {
    path: 'item-lookup',
    component: ItemLookupComponent,
  },
  {
    path: 'item-detail-info/:id',
    component: ItemDetailInfoComponent,
  },
  {
    path: 'user-info',
    component: UserInfoComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'bin-map',
    component: BinMapComponent
  },
  {
    path: 'depot-map',
    component: DepotMapComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
