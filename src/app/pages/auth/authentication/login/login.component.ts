import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PrimeIcons} from "primeng/api";
import {RolesEnum} from "@shared/enums";
import {AuthHttpService, AuthService} from '@services/auth';
import {CoreService, InstitutionsService, MessageService, RoutesService} from '@services/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authHttpService: AuthHttpService,
              protected coreService: CoreService,
              private institutionsService: InstitutionsService,
              public messageService: MessageService,
              protected authService: AuthService,
              private routesService: RoutesService) {
    this.form = this.newForm();
  }

  ngOnInit(): void {

  }

  newForm(): FormGroup {
    return this.formBuilder.group({
      // username: ['reviewer', [Validators.required]],
      username: [null, [Validators.required]],
      // password: ['12345678', [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.login();
    } else {
      this.form.markAllAsTouched();
    }
  }

  login() {
    this.authService.removeLogin();
    this.authHttpService.login(this.form.value)
      .subscribe(
        response => {
          if (this.authService.roles.length === 0) {
            this.messageService.errorCustom('Sin Rol', 'No cuenta con un rol asignado');
            this.authService.removeLogin();
            return;
          }

          if (this.authService.roles.length === 1) {
            this.authService.role = this.authService.roles[0];

            if (this.institutionsService.institutions.length === 0 && this.authService.role.code !== RolesEnum.ADMIN) {
              this.messageService.errorCustom('Sin Institución', 'No cuenta con al menos una Institución asignada');
              this.authService.removeLogin();
              return;
            }

            if (this.authService.role.code === RolesEnum.ADMIN) {
              this.authService.selectDashboard();
              return;
            }

            this.routesService.institutionSelect();
          } else {
            this.routesService.roleSelect();
          }
        });
  }

  /** Redirects **/
  redirectPasswordReset() {
    this.routesService.passwordReset();
  }

  /** Getters **/
  get usernameField(): AbstractControl {
    return this.form.controls['username'];
  }

  get passwordField(): AbstractControl {
    return this.form.controls['password'];
  }
}
