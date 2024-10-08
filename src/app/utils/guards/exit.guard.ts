// import {Injectable} from '@angular/core';
// import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
// import {Observable} from 'rxjs';
// import {OnExitInterface} from '@utils/interfaces/on-exit.interface';
//
//
// @Injectable({
//   providedIn: 'root'
// })
// export class ExitGuard implements CanDeactivate<unknown> {
//   canDeactivate(
//     component: OnExitInterface,
//     currentRoute: ActivatedRouteSnapshot,
//     currentState: RouterStateSnapshot,
//     nextState?: RouterStateSnapshot):
//     Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return component.onExit() ? component.onExit() : true;
//   }
// }

import {CanDeactivateFn} from "@angular/router";

export const ExitGuard: CanDeactivateFn<any> = async (component) => {
  return await component.onExit();
}
