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

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
