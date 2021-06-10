import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    //Custom Routes
    { path: '/agences', title: 'Agences / Sites',  icon:'notifications', class: 'sousMenu1' },
    { path: '/agents-collecteurs', title: 'Agents Collecteurs',  icon:'notifications', class: 'sousMenu1' },
    { path: '/caisses', title: 'Caisses',  icon:'notifications', class: 'sousMenu1' },
    { path: '/clients', title: 'Clients',  icon:'notifications', class: 'sousMenu1' },
    { path: '/tontines', title: 'Tontines',  icon:'notifications', class: 'sousMenu1' },
    { path: '/objets-tontines', title: 'Objets de Tontine',  icon:'notifications', class: 'sousMenu1' },
    { path: '/oper-caisse', title: 'Opérations de Caisse',  icon:'notifications', class: 'sousMenu2' },
    { path: '/ramassages', title: 'Ramassages',  icon:'notifications', class: 'sousMenu2' },
    { path: '/depenses', title: 'Dépenses',  icon:'notifications', class: 'sousMenu2' },
    { path: '/users', title: 'Utilisateurs',  icon:'notifications', class: 'sousMenu4' },
    { path: '/associations', title: 'Associations',  icon:'notifications', class: 'sousMenu4' },
    { path: '/types-depense', title: 'Types de Dépense',  icon:'notifications', class: 'sousMenu4' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  menuItems1: any[];
  menuItems2: any[];
  menuItems3: any[];
  menuItems4: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);

    this.menuItems1 = ROUTES.filter(menuItem => menuItem.class == 'sousMenu1');
    this.menuItems2 = ROUTES.filter(menuItem => menuItem.class == 'sousMenu2');
    this.menuItems3 = ROUTES.filter(menuItem => menuItem.class == 'sousMenu3');
    this.menuItems4 = ROUTES.filter(menuItem => menuItem.class == 'sousMenu4');

  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
