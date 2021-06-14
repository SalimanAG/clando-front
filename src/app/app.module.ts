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
import { NewClientDialogComponent } from './customComponents/clients/new-client-dialog/new-client-dialog.component';
import { EditClientDialogComponent } from './customComponents/clients/edit-client-dialog/edit-client-dialog.component';
import { DetailClientDialogComponent } from './customComponents/clients/detail-client-dialog/detail-client-dialog.component';
import { UserToAgenceComponent } from './customComponents/associations/user-to-agence/user-to-agence.component';
import { UserToCaisseComponent } from './customComponents/associations/user-to-caisse/user-to-caisse.component';
import { NewAssoUserToAgenceDialogComponent } from './customComponents/associations/user-to-agence/new-asso-user-to-agence-dialog/new-asso-user-to-agence-dialog.component';
import { EditAssoUserToAgenceDialogComponent } from './customComponents/associations/user-to-agence/edit-asso-user-to-agence-dialog/edit-asso-user-to-agence-dialog.component'; 
import { AddingAgenceDlgComponent } from './customComponents/agences/adding-agence-dlg/adding-agence-dlg.component';
import { EditingAgenceDlgComponent } from './customComponents/agences/editing-agence-dlg/editing-agence-dlg.component';
import { NewCaisseDialogComponent } from './customComponents/caissieres/new-caisse-dialog/new-caisse-dialog.component';
import { EditCaisseDialogComponent } from './customComponents/caissieres/edit-caisse-dialog/edit-caisse-dialog.component';
import { NewAssoUserCaisseDialogComponent } from './customComponents/associations/user-to-caisse/new-asso-user-caisse-dialog/new-asso-user-caisse-dialog.component';
import { EditAssoUserCaisseDialogComponent } from './customComponents/associations/user-to-caisse/edit-asso-user-caisse-dialog/edit-asso-user-caisse-dialog.component';
import { TypeDepenseComponent } from './customComponents/type-depense/type-depense.component';
import { DepensesComponent } from './customComponents/depenses/depenses.component';
import { NewDepenseDialogComponent } from './customComponents/depenses/listes-depense/new-depense-dialog/new-depense-dialog.component';
import { EditDepenseDialogComponent } from './customComponents/depenses/listes-depense/edit-depense-dialog/edit-depense-dialog.component';
import { NewTypeDepenseDialogComponent } from './customComponents/type-depense/new-type-depense-dialog/new-type-depense-dialog.component';
import { EditTypeDepenseDialogComponent } from './customComponents/type-depense/edit-type-depense-dialog/edit-type-depense-dialog.component';
import { AffecterComponent } from './customComponents/agents-collecteurs/affecter/affecter.component';
import { DetailCollecteurDialogComponent } from './customComponents/agents-collecteurs/detail-collecteur-dialog/detail-collecteur-dialog.component'
import { EditCollecteurDialogComponent } from './customComponents/agents-collecteurs/edit-collecteur-dialog/edit-collecteur-dialog.component';
import { HistoriqueComponent } from './customComponents/agents-collecteurs/historique/historique.component';
import { NewCollecteurDialogComponent } from './customComponents/agents-collecteurs/new-collecteur-dialog/new-collecteur-dialog.component';
import { ValidationDepenseComponent } from './customComponents/depenses/validation-depense/validation-depense.component';
import { ListesDepenseComponent } from './customComponents/depenses/listes-depense/listes-depense.component';
import { DetailDepenseDialogComponent } from './customComponents/depenses/listes-depense/detail-depense-dialog/detail-depense-dialog.component';
import { EditRamassageComponent } from './customComponents/ramassages/edit-ramassage/edit-ramassage.component';
import { ServirTontineComponent } from './customComponents/tontines/servir-tontine/servir-tontine.component';
import { NewOperCaisseDialogComponent } from './customComponents/oper-caisse/new-oper-caisse-dialog/new-oper-caisse-dialog.component';


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
    NewClientDialogComponent,
    EditClientDialogComponent,
    DetailClientDialogComponent,
    UserToAgenceComponent,
    UserToCaisseComponent,
    NewAssoUserToAgenceDialogComponent,
    EditAssoUserToAgenceDialogComponent,
    AddingAgenceDlgComponent,
    EditingAgenceDlgComponent,
    NewCaisseDialogComponent,
    EditCaisseDialogComponent,
    NewAssoUserCaisseDialogComponent,
    EditAssoUserCaisseDialogComponent,
    TypeDepenseComponent,
    DepensesComponent,
    NewDepenseDialogComponent,
    EditDepenseDialogComponent,
    NewTypeDepenseDialogComponent,
    EditTypeDepenseDialogComponent,
    AffecterComponent,
    DetailCollecteurDialogComponent,
    EditCollecteurDialogComponent,
    HistoriqueComponent,
    NewCollecteurDialogComponent,
    ListesDepenseComponent,
    ValidationDepenseComponent,
    DetailDepenseDialogComponent,
    RamassagesComponent,
    EditRamassageComponent,
    EditRamassageComponent,
    ServirTontineComponent,
    NewOperCaisseDialogComponent,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
