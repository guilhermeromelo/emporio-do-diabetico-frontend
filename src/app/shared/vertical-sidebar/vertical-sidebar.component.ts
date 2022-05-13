import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedUser } from 'src/app/loginController/loggedUserModel';
import LoginController from 'src/app/loginController/loginController';
import { RouteInfo } from './vertical-sidebar.metadata';
import { VerticalSidebarService } from './vertical-sidebar.service';


@Component({
  selector: 'app-vertical-sidebar',
  templateUrl: './vertical-sidebar.component.html'
})
export class VerticalSidebarComponent {
  @Input() showClass: boolean = false;
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: RouteInfo[] = [];
  path = '';

  blogPageUrl = "/blog/home";
  isLogged = false;
  loggedUser: LoggedUser = {};
  nameToShow = '';

  constructor(private menuServise: VerticalSidebarService, private router: Router) {
    this.isLogged = LoginController.isLogged();
    if(this.isLogged) {
      this.loggedUser = <LoggedUser> LoginController.getLoggedUser();
      this.nameToShow = this.formatName();
    }

    this.menuServise.items.subscribe(menuItems => {
      this.sidebarnavItems = menuItems;

      // Active menu
      this.sidebarnavItems.filter(m => m.submenu.filter(
        (s) => {
          if (s.path === this.router.url) {
            this.path = m.title;
          }
        }
      ));
      this.addExpandClass(this.path);
    });
  }

  formatName(){
    if(this.loggedUser && this.loggedUser.name)
      return this.loggedUser.name?.length > 18 ? this.loggedUser.name?.slice(0,17) + '...' : this.loggedUser.name
    else
      return '';
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  handleNotify() {
    this.notify.emit(!this.showClass);
  }

  goToPedidosPage(){
    return '/pedidos';
  }

  goToLoginPage(){
    if(LoginController.isLogged() == false)
      this.router.navigateByUrl('/authentication/login');
  }

  logout(){
    LoginController.logout();
    window.open('/',"_self");;
  }
}
