import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Главная', icon: 'dashboard', class: '' },
  { path: '/students', title: 'Ученики', icon: 'people', class: '' },
  { path: '/subjects', title: 'Предметы', icon: 'local_library', class: '' },
  { path: '/courses', title: 'Курсы', icon: 'library_books', class: '' },
  { path: '/lessons', title: 'Занятия', icon: 'bubble_chart', class: '' },
  { path: '/logs', title: 'Логи', icon: 'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [];

  constructor(private router: Router) { }

  HomeClick(){
    this.router.navigate(['dashboard']);
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
