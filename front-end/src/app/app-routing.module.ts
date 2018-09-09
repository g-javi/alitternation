import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ImageCaptureComponent } from './components/image-capture/image-capture.component';
import { ItemLookupComponent } from './components/item-lookup/item-lookup.component';
import { ItemDetailInfoComponent } from './components/item-detail-info/item-detail-info.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserGuard } from './guards/user.guard';

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
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
