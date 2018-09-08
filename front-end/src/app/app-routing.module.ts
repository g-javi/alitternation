import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ImageCaptureComponent } from './components/image-capture/image-capture.component';
import { ItemLookupComponent } from './components/item-lookup/item-lookup.component';
import { ItemDetailInfoComponent } from './components/item-detail-info/item-detail-info.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserSignInComponent } from './components/user-sign-in/user-sign-in.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
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
  },
  {
    path: 'user-sign-in',
    component: UserSignInComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
