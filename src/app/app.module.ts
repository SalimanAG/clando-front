import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AgencesComponent } from './customComponents/agences/agences.component';
import { AgentsCollecteursComponent } from './customComponents/agents-collecteurs/agents-collecteurs.component';
import { CaissieresComponent } from './customComponents/caissieres/caissieres.component';
import { ClientsComponent } from './customComponents/clients/clients.component';
import { TontinesComponent } from './customComponents/tontines/tontines.component';
import { ObjetsTontineComponent } from './customComponents/objets-tontine/objets-tontine.component';
import { OperCaisseComponent } from './customComponents/oper-caisse/oper-caisse.component';
import { RamassagesComponent } from './customComponents/ramassages/ramassages.component';
import { UtilisateursComponent } from './customComponents/utilisateurs/utilisateurs.component';
import { AssociationsComponent } from './customComponents/associations/associations.component';
import { AuthenComponent } from './customComponents/authen/authen.component';
import { MatModulesModule } from './angMatModules/mat-modules/mat-modules.module';
import { NewUserDialogComponent } from './customComponents/utilisateurs/new-user-dialog/new-user-dialog.component';
import { ToastrModule } from 'ngx-toastr';
import { EditUserDialogComponent } from './customComponents/utilisateurs/edit-user-dialog/edit-user-dialog.component';
import { DetailUserDialogComponent } from './customComponents/utilisateurs/detail-user-dialog/detail-user-dialog.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NewObjetTontineDialogComponent } from './customComponents/objets-tontine/new-objet-tontine-dialog/new-objet-tontine-dialog.component';
import { EditObjetTontineDialogComponent } from './customComponents/objets-tontine/edit-objet-tontine-dialog/edit-objet-tontine-dialog.component';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction';
import { NewTontineDialogComponent } from './customComponents/tontines/new-tontine-dialog/new-tontine-dialog.component';
import { EditTontineDialogComponent } from './customComponents/tontines/edit-tontine-dialog/edit-tontine-dialog.component';
import { DetailTontineDialogComponent } from './customComponents/tontines/detail-tontine-dialog/detail-tontine-dialog.component';
import { CalendarTontineDialogComponent } from './customComponents/tontines/calendar-tontine-dialog/calendar-tontine-dialog.component'; 

FullCalendarModule.registerPlugins([ 
  dayGridPlugin,
  interactionPlugin
]);


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatModulesModule,
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    FullCalendarModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AgencesComponent,
    AgentsCollecteursComponent,
    CaissieresComponent,
    ClientsComponent,
    TontinesComponent,
    ObjetsTontineComponent,
    OperCaisseComponent,
    RamassagesComponent,
    UtilisateursComponent,
    AssociationsComponent,
    AuthenComponent,
    NewUserDialogComponent,
    EditUserDialogComponent,
    DetailUserDialogComponent,
    NewObjetTontineDialogComponent,
    EditObjetTontineDialogComponent,
    NewTontineDialogComponent,
    EditTontineDialogComponent,
    DetailTontineDialogComponent,
    CalendarTontineDialogComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
