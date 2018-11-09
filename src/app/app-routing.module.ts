import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {Full_ROUTES} from './shared/routes/full-layout.routes';
import {CONTENT_ROUTES} from './shared/routes/content-layout.routes';
import {ContentLayoutComponent} from './layouts/content/content-layout.component';
import {FullLayoutComponent} from './layouts/full/full-layout.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/sign-in',
    pathMatch: 'full',
  },

  { path: '', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES},
  { path: '', component: ContentLayoutComponent, data: { title: 'content Views' }, children: CONTENT_ROUTES },
];

@NgModule({
  exports :[RouterModule],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes , {useHash: true })
  ],
  declarations: []
})
export class AppRoutingModule { }
