import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { AgencesComponent } from 'app/customComponents/agences/agences.component';
import { AgentsCollecteursComponent } from 'app/customComponents/agents-collecteurs/agents-collecteurs.component';
import { CaissieresComponent } from 'app/customComponents/caissieres/caissieres.component';
import { ClientsComponent } from 'app/customComponents/clients/clients.component';
import { TontinesComponent } from 'app/customComponents/tontines/tontines.component';
import { ObjetsTontineComponent } from 'app/customComponents/objets-tontine/objets-tontine.component';
import { OperCaisseComponent } from 'app/customComponents/oper-caisse/oper-caisse.component';
import { RamassagesComponent } from 'app/customComponents/ramassages/ramassages.component';
import { UtilisateursComponent } from 'app/customComponents/utilisateurs/utilisateurs.component';
import { AssociationsComponent } from 'app/customComponents/associations/associations.component';
import { AuthenComponent } from 'app/customComponents/authen/authen.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },

    //Custom Paths
    { path: 'agences',        component: AgencesComponent },
    { path: 'agents-collecteurs',        component: AgentsCollecteursComponent },
    { path: 'caissieres',        component: CaissieresComponent },
    { path: 'clients',        component: ClientsComponent },
    { path: 'tontines',        component: TontinesComponent },
    { path: 'objets-tontines',        component: ObjetsTontineComponent },
    { path: 'oper-caisse',        component: OperCaisseComponent },
    { path: 'ramassages',        component: RamassagesComponent },
    { path: 'users',        component: UtilisateursComponent },
    { path: 'associations',        component: AssociationsComponent },
    { path: 'auth',        component: AuthenComponent },

];
