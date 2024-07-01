import {Component, inject, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {BreadcrumbService, CoreService} from '@services/core';
import {AuthService} from "@services/auth";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  protected readonly PrimeIcons = PrimeIcons;
  protected subscription: Subscription;
  protected items: MenuItem[] = [];
  protected home: MenuItem;

  protected readonly breadcrumbService = inject(BreadcrumbService);
  protected readonly coreService = inject(CoreService);
  protected readonly authService = inject(AuthService);

  constructor() {
    this.subscription = this.breadcrumbService.itemsHandler.subscribe(response => {
      this.items = response as MenuItem[];
    });

    this.home = {icon: PrimeIcons.HOME, routerLink: `/core/dashboards/${this.authService.role?.code}`};
  }
}
