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
import { TypeDepenseComponent } from 'app/customComponents/type-depense/type-depense.component';
import { DepensesComponent } from 'app/customComponents/depenses/depenses.component';
import { CollectesComponent } from 'app/customComponents/rapports/collectes/collectes.component';
import { TontinesRapComponent } from 'app/customComponents/rapports/tontines-rap/tontines-rap.component';
import { AgencesRapComponent } from 'app/customComponents/rapports/agences-rap/agences-rap.component';
import { CollecteursRapComponent } from 'app/customComponents/rapports/collecteurs-rap/collecteurs-rap.component';
import { AuthGuardService } from 'services/tools/auth-guard.service';

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
    { path: 'dashboard',   canActivate:[AuthGuardService],   component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },

    //Custom Paths
    { path: 'agences',    canActivate:[AuthGuardService],    component: AgencesComponent },
    { path: 'agents-collecteurs',    canActivate:[AuthGuardService],    component: AgentsCollecteursComponent },
    { path: 'caisses',   canActivate:[AuthGuardService],     component: CaissieresComponent },
    { path: 'clients',   canActivate:[AuthGuardService],     component: ClientsComponent },
    { path: 'tontines',    canActivate:[AuthGuardService],    component: TontinesComponent },
    { path: 'objets-tontines',   canActivate:[AuthGuardService],     component: ObjetsTontineComponent },
    { path: 'oper-caisse',   canActivate:[AuthGuardService],     component: OperCaisseComponent },
    { path: 'ramassages',    canActivate:[AuthGuardService],    component: RamassagesComponent },
    { path: 'users',    canActivate:[AuthGuardService],    component: UtilisateursComponent },
    { path: 'associations',    canActivate:[AuthGuardService],    component: AssociationsComponent },
    { path: 'auth',        component: AuthenComponent },
    { path: 'types-depense',    canActivate:[AuthGuardService],    component: TypeDepenseComponent },
    { path: 'depenses' ,   canActivate:[AuthGuardService], component: DepensesComponent },
    {
        path: 'rapports',
        canActivate:[AuthGuardService],
        children: [ 
            {
                path: 'collectes',
                component: CollectesComponent},
            {
                path: 'tontines',
                component: TontinesRapComponent},
            {
                path: 'agences',
                component: AgencesRapComponent},
            {
                path: 'collecteurs',
                component: CollecteursRapComponent},
        
        ]
    }

];
