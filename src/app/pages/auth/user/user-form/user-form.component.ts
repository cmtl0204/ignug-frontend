import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CreateUserDto, RoleModel, UpdateUserDto} from '@models/auth';
import {RolesHttpService, UsersHttpService} from '@services/auth';
import {
  BreadcrumbService,
  CataloguesHttpService,
  CoreService,
  InstitutionsHttpService,
  MessageService,
  RoutesService
} from '@services/core';
import {OnExitInterface} from '@utils/interfaces';
import {PrimeIcons} from "primeng/api";
import {
  BreadcrumbEnum,
  CatalogueTypeEnum,
  IconButtonActionEnum,
  LabelButtonActionEnum, RoutesEnum,
  SeverityButtonActionEnum,
  SkeletonEnum,
  UsersIdentificationTypeStateEnum
} from "@utils/enums";
import {CareerModel, CatalogueModel, InstitutionModel} from "@models/core";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnExitInterface {
  @Input({required: true}) id!: string;
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;
  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected form: FormGroup;
  protected isChangePassword: FormControl = new FormControl(false);
  protected roles: RoleModel[] = [];
  protected identificationTypes: CatalogueModel[] = [];
  protected institutions: InstitutionModel[] = [];
  protected careers: CareerModel[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private cataloguesHttpService: CataloguesHttpService,
    protected coreService: CoreService,
    private formBuilder: FormBuilder,
    public messageService: MessageService,
    private router: Router,
    private rolesHttpService: RolesHttpService,
    private routesService: RoutesService,
    private usersHttpService: UsersHttpService,
    private institutionsHttpService: InstitutionsHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.USERS, routerLink: [this.routesService.users]},
      {label: BreadcrumbEnum.FORM},
    ]);

    this.form = this.newForm;

    this.identificationTypeField.valueChanges.subscribe(value => {
      if (value) {
        this.identificationField.enable();
      } else {
        this.identificationField.disable();
      }

      if (value.code === UsersIdentificationTypeStateEnum.IDENTIFICATION) {
        this.identificationField.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)])
      } else {
        this.identificationField.clearValidators();
      }

      this.identificationField.updateValueAndValidity();
    });
  }

  async onExit(): Promise<boolean> {
    if (this.form.touched || this.form.dirty) {
      return await this.messageService.questionOnExit().then(result => result.isConfirmed);
    }

    return true;
  }

  ngOnInit(): void {
    this.loadRoles();
    this.loadIdentificationTypes();
    this.loadInstitutions();

    if (this.id !== RoutesEnum.NEW) {
      this.getUser();
      this.passwordField.clearValidators();
    } else {
      this.isChangePassword.setValue(true);
      this.passwordField.enable();
      this.passwordChangedField.enable();
    }

    this.institutionField.valueChanges.subscribe(value => {
      if (value)
        this.loadCareers(value.id);
    });
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      identification: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      identificationType: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      name: [null, [Validators.required]],
      password: [{value: null, disabled: true}, [Validators.required, Validators.minLength(8)]],
      passwordChanged: [{value: true, disabled: true}],
      roles: [null, [Validators.required]],
      institution: [null, [Validators.required]],
      careers: [null, [Validators.required]],
      username: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    this.usernameField.setValue(this.identificationField.value);

    if (this.form.valid) {
      if (this.id === RoutesEnum.NEW) {
        this.create(this.form.value);
      } else {
        this.update(this.form.value);
      }
    } else {
      this.form.markAllAsTouched();
      this.messageService.errorsFields();
    }
  }

  back(): void {
    this.router.navigate([this.routesService.users]);
  }

  create(user: CreateUserDto): void {
    user.passwordChanged = !user.passwordChanged;
    this.usersHttpService.create(user).subscribe(user => {
      this.form.reset(user);
      this.back();
    });
  }

  loadRoles(): void {
    this.rolesHttpService.findAll().subscribe((roles) => this.roles = roles);
  }

  loadInstitutions(): void {
    this.institutionsHttpService.findAll().subscribe((response) => this.institutions = response.data);
  }

  loadCareers(institutionId: string): void {
    this.institutionsHttpService.findCareersByInstitution(institutionId).subscribe((careers) => this.careers = careers);
  }

  getUser(): void {
    this.usersHttpService.findOne(this.id!).subscribe((user) => {
      this.form.patchValue(user);

      if (user.institutions) {
        this.institutionField.patchValue(user.institutions[0]);
      }
    });
  }

  loadIdentificationTypes(): void {
    this.identificationTypes = this.cataloguesHttpService.findByType(CatalogueTypeEnum.IDENTIFICATION_TYPE);
  }

  handleChangePassword(event: any) {
    this.isChangePassword.setValue(event.checked);
    if (this.isChangePassword.value) {
      this.passwordChangedField.enable();
      this.passwordField.enable();
      this.passwordField.setValidators([Validators.required, Validators.minLength(8)]);
    } else {
      this.passwordChangedField.setValue(false);
      this.passwordChangedField.disable();
      this.passwordField.setValue(null);
      this.passwordField.disable();
      this.passwordField.clearValidators();
    }
    this.passwordField.updateValueAndValidity();
  }

  update(user: UpdateUserDto): void {
    user.passwordChanged = !user.passwordChanged;

    this.usersHttpService.update(this.id!, user).subscribe((user) => {
      this.form.reset(user);
      this.back()
    });
  }

  get emailField(): AbstractControl {
    return this.form.controls['email'];
  }

  get identificationField(): AbstractControl {
    return this.form.controls['identification'];
  }

  get identificationTypeField(): AbstractControl {
    return this.form.controls['identificationType'];
  }

  get lastnameField(): AbstractControl {
    return this.form.controls['lastname'];
  }

  get nameField(): AbstractControl {
    return this.form.controls['name'];
  }

  get passwordField(): AbstractControl {
    return this.form.controls['password'];
  }

  get passwordChangedField(): AbstractControl {
    return this.form.controls['passwordChanged'];
  }

  get rolesField(): FormArray {
    return this.form.controls['roles'] as FormArray;
  }

  get institutionField(): AbstractControl {
    return this.form.controls['institution'];
  }

  get careersField(): FormArray {
    return this.form.controls['careers'] as FormArray;
  }

  get usernameField(): AbstractControl {
    return this.form.controls['username'];
  }
}
