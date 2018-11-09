import { Routes } from '@angular/router';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {PatientComponent} from '../../patient/patient.component';
import {ArchiveComponent} from '../../archive/archive.component';
import {RdvComponent} from '../../rdv/rdv.component';
import {ConsultationComponent} from '../../consultation/consultation.component';
import {UploadFileComponent} from '../../upload-file/upload-file.component';

//Route for content layout with sidebar, navbar and footer
export const Full_ROUTES: Routes = [
  {
    path: 'dashboard',
    component : DashboardComponent
  },
  {
    path: 'Patient',
    component : PatientComponent

  },
  {
    path: 'Archive_Medical',
    component : ArchiveComponent
  }
  ,
  {
    path: 'Rendez_Vous',
    component : RdvComponent
  } ,
  {
    path: 'consultation',
    component : ConsultationComponent
  }
];
