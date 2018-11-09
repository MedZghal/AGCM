import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import { AppRoutingModule } from './/app-routing.module';
import {FullLayoutComponent} from './layouts/full/full-layout.component';
import {ContentLayoutComponent} from './layouts/content/content-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthenticationModule} from './authentication/authentication.module';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularWebStorageModule} from 'angular-web-storage';
import { PatientComponent } from './patient/patient.component';
import { MomentPipe } from './moment.pipe';
import * as moment from 'moment';
import { ArchiveComponent } from './archive/archive.component';
import {NG_SELECT_DEFAULT_CONFIG, NgSelectModule} from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { RdvComponent } from './rdv/rdv.component';
import { PatientModalComponent } from './patient-modal/patient-modal.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import {WebStorageModule} from "h5webstorage";
moment.locale('fr');

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    ContentLayoutComponent,
    DashboardComponent,
    PatientComponent,
    MomentPipe,
    ArchiveComponent,
    SchedulerComponent,
    RdvComponent,
    PatientModalComponent,
    ConsultationComponent,
    UploadFileComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthenticationModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularWebStorageModule,
    NgSelectModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressAnimation :'increasing'
    }),
    WebStorageModule.forRoot()
  ],
  providers: [
    {
      provide: NG_SELECT_DEFAULT_CONFIG,
      useValue: {
        notFoundText: 'Aucun résultat trouvé veuillez vérifier les données'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
