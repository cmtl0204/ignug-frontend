import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {AuthenticationRoutingModule} from './authentication-routing.module';
import {ReactiveFormsModule} from "@angular/forms";

import {DividerModule} from "primeng/divider";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {RippleModule} from "primeng/ripple";

import {SharedModule} from "@shared/shared.module";

import {LoginComponent} from "./login/login.component";
import {PasswordChangeComponent} from "./password-change/password-change.component";
import {PasswordResetComponent} from "./password-reset/password-reset.component";
import {RoleSelectComponent} from "./role-select/role-select.component";
import {DropdownModule} from "primeng/dropdown";
import {InstitutionSelectComponent} from "./institution-select/institution-select.component";
import {MessageModule} from "primeng/message";


@NgModule({
  declarations: [LoginComponent, PasswordChangeComponent, PasswordResetComponent, RoleSelectComponent, InstitutionSelectComponent],
  exports: [PasswordChangeComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    ButtonModule,
    CardModule,
    CheckboxModule,
    DividerModule,
    InputTextModule,
    PasswordModule,
    RippleModule,
    DropdownModule,
    NgOptimizedImage,
    MessageModule,
  ]
})
export class AuthenticationModule {
}
