import {PermissionModel} from './permission.model';

export interface MenuModel {
  id: string;
  children: MenuModel[],
  code: string;
  icon: string;
  isVisible: boolean;
  label: string;
  routerLink: string;
  type: string;
}

export interface CreateMenuDto extends Omit<MenuModel, 'id'> {
}

export interface UpdateMenuDto extends Partial<Omit<MenuModel, 'id'>> {
}

export interface ReadMenuDto extends Partial<MenuModel> {
}
