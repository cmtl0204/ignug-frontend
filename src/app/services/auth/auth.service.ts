import {Injectable} from '@angular/core';
import {PermissionModel, RoleModel, UserModel} from '@models/auth';
import {environment} from "@env/environment";
import {CareerModel, InstitutionModel} from "@models/core";
import {RolesEnum} from "@shared/enums";
import {MessageService, RoutesService} from "@services/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private routesService: RoutesService, private messageService: MessageService) {
  }

  changeTheme(theme: string) {
    // const themePath = themes.find(element => element.name == theme)?.path;
    //
    // const element = document.getElementById('theme-css');
    // if (element && themePath) {
    //   element.setAttribute('href', themePath);
    // }
  }

  get isLoggedIn(): boolean {
    return Boolean(sessionStorage.getItem('isLoggedIn'));
  }

  set isLoggedIn(value: boolean) {
    sessionStorage.setItem('isLoggedIn', String(value));
  }

  get token(): string | null {
    return sessionStorage.getItem('token');
  }

  set token(value: string | undefined | null) {
    sessionStorage.setItem('token', JSON.stringify(value));
  }

  set avatar(value: string) {
    const auth = this.auth;
    auth.avatar = value;
    sessionStorage.setItem('auth', JSON.stringify(auth));
  }

  get auth(): UserModel {
    return JSON.parse(String(sessionStorage.getItem('auth')));
  }

  set auth(user: UserModel | undefined | null) {
    sessionStorage.setItem('auth', JSON.stringify(user));
  }

  get permissions(): PermissionModel[] {
    return JSON.parse(String(sessionStorage.getItem('permissions')));
  }

  set permissions(permissions: PermissionModel[] | undefined | null) {
    sessionStorage.setItem('permissions', JSON.stringify(permissions));
  }

  get role(): RoleModel {
    return JSON.parse(String(sessionStorage.getItem('role')));
  }

  set role(role: RoleModel | undefined | null) {
    sessionStorage.setItem('role', JSON.stringify(role));
  }

  get roles(): RoleModel[] {
    return JSON.parse(String(sessionStorage.getItem('roles')));
  }

  set roles(roles: RoleModel[] | undefined | null) {
    sessionStorage.setItem('roles', JSON.stringify(roles));
  }

  get keepSession(): boolean | null {
    return JSON.parse(String(sessionStorage.getItem('keepSession')));
  }

  set keepSession(value: boolean | undefined | null) {
    sessionStorage.setItem('keepSession', JSON.stringify(value));
  }

  get system(): string | null {
    return environment.APP_NAME;
  }

  get systemShortName(): string | null {
    return environment.APP_SHORT_NAME;
  }

  removeLogin() {
    sessionStorage.clear();
    sessionStorage.clear();
  }

  selectDashboard() {
    this.messageService.successCustom('Bienvenido', 'Ingreso Correcto');
    switch (this.role.code) {
      case RolesEnum.ADMIN: {
        this.routesService.dashboardAdmin();
        break;
      }
      case RolesEnum.RECTOR: {
        this.routesService.dashboardRector();
        break;
      }
      case RolesEnum.TEACHER: {
        this.routesService.dashboardTeacher();
        break;
      }
      case RolesEnum.STUDENT: {
        this.routesService.dashboardStudent();
        break;
      }
      case RolesEnum.COORDINATOR_ADMINISTRATIVE: {
        this.routesService.dashboardCoordinatorAdministrative();
        break;
      }
      case RolesEnum.COORDINATOR_CAREER: {
        this.routesService.dashboardCoordinatorCareer();
        break;
      }
      case RolesEnum.REVIEWER: {
        this.routesService.dashboardReviewer();
        break;
      }
      case RolesEnum.SECRETARY: {
        this.routesService.dashboardSecretary();
        break;
      }
      case RolesEnum.WELFARE: {
        this.routesService.dashboardWelfare();
        break;
      }
    }
  }
}
