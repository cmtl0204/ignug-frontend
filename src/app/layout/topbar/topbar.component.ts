import {Component, inject, ViewEncapsulation} from '@angular/core';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {BreadcrumbService, CoreService, RoutesService} from '@services/core';
import {AuthHttpService, AuthService} from "@services/auth";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopbarComponent {
  protected readonly PrimeIcons = PrimeIcons;
  protected items: MenuItem[] = [];
  protected home!: MenuItem;
  protected menu!: MenuItem;
  protected nickname!: string;

  protected readonly breadcrumbService = inject(BreadcrumbService);
  protected readonly coreService = inject(CoreService);
  private readonly authHttpService = inject(AuthHttpService);
  public readonly authService = inject(AuthService);
  private readonly routesService = inject(RoutesService);

  constructor() {
    if (this.authService.auth) {
      this.nickname = `${this.authService.auth.name} ${this.authService.auth.lastname} - ${this.authService.role.name}`;
    }

    this.menu = {label: 'Menú', icon: PrimeIcons.LIST, command: () => this.coreService.sidebarVisible = true};

    this.items.push(this.menu);

    this.items.push(
      {
        label: this.nickname,
        icon: PrimeIcons.USER,
        routerLink: [this.routesService.profile]
      },
      {
        label: 'Cerrar Sesión',
        icon: PrimeIcons.POWER_OFF,
        command: () => {
          this.authHttpService.signOut();
        }
      },
    )
  }

  updateSystem() {
    this.coreService.updateSystem();
  }
}
