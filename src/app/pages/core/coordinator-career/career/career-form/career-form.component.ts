import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PrimeIcons} from 'primeng/api';
import {OnExitInterface} from '@utils/interfaces';
import {CareerModel, CatalogueModel, InstitutionModel} from '@models/core';
import {
  BreadcrumbService,
  CataloguesHttpService,
  CoreService,
  MessageService,
  RoutesService,
  CareersHttpService,
  InstitutionsService, CareersService
} from '@services/core';
import {
    BreadcrumbEnum,
    CareerFormEnum,
    CatalogueTypeEnum,
    ClassButtonActionEnum,
    IconButtonActionEnum,
    LabelButtonActionEnum, SeverityButtonActionEnum,
    SkeletonEnum
} from '@utils/enums';
import {AuthService} from "@services/auth";

@Component({
  selector: 'app-career-form',
  templateUrl: './career-form.component.html',
  styleUrls: ['./career-form.component.scss']
})
export class CareerFormComponent implements OnInit, OnExitInterface {
  protected id: string | null = null;
  protected form: FormGroup;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly ClassButtonActionEnum = ClassButtonActionEnum;
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected formErrors: string[] = [];

  protected readonly CareerFormEnum = CareerFormEnum;

  // Foreign Keys
  protected institutions: InstitutionModel[] = [];
  protected states: CatalogueModel[] = [];
  protected modalities: CatalogueModel[] = [];
  protected types: CatalogueModel[] = [];


  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private careersService: CareersService,
    private cataloguesHttpService: CataloguesHttpService,
    public coreService: CoreService,
    private formBuilder: FormBuilder,
    public messageService: MessageService,
    private router: Router,
    private routesService: RoutesService,
    private careersHttpService: CareersHttpService,
    private institutionsService: InstitutionsService,
  ) {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.INSTITUTIONS, routerLink: routesService.institutions},
      {label: BreadcrumbEnum.CAREERS, routerLink: [this.routesService.careers]},
      {label: BreadcrumbEnum.FORM},
    ]);

    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
    }

    this.form = this.newForm;
  }

  async onExit(): Promise<boolean> {
    if (this.form.touched && this.form.dirty) {
      return await this.messageService.questionOnExit().then(result => result.isConfirmed);
    }
    return true;
  }

  ngOnInit(): void {
    this.loadStates();
    this.loadModalities();

    if (this.id) {
      this.get();
    }
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      acronym: [null, [Validators.required]],
      code: [null, [Validators.required]],
      codeSniese: [null, []],
      degree: [null, [Validators.required]],
      institution: [this.institutionsService.institution, [Validators.required]],
      isEnabled: [true, [Validators.required]],
      isVisible: [true, [Validators.required]],
      logo: [null, []],
      modality: [null, [Validators.required]],
      name: [null, [Validators.required]],
      resolutionNumber: [null, []],
      shortName: [null, [Validators.required]],
      state: [true, [Validators.required]],
      type: [null, []],
      userId: [this.authService.auth.id],
    });
  }

  onSubmit(): void {
    if (this.validateForm) {
      if (this.id) {
        this.update(this.form.value);
      } else {
        this.create(this.form.value);
      }
    } else {
      this.form.markAllAsTouched();
      this.messageService.errorsFields(this.formErrors);
    }
  }

  back(): void {
    this.router.navigate([this.routesService.careers]);
  }

  /** Actions **/
  create(item: CareerModel): void {
    this.careersHttpService.create(item).subscribe(career => {
      const careers = this.careersService.careers;
      careers.push(career);
      this.careersService.careers = careers;

      this.form.reset();
      this.back();
    });
  }

  update(item: CareerModel): void {
    this.careersHttpService.update(this.id!, item).subscribe(() => {
      this.form.reset();
      this.back();
    });
  }

  get validateForm() {
    this.formErrors = [];

    if (this.codeField.errors) this.formErrors.push(CareerFormEnum.code);
    if (this.codeSnieseField.errors) this.formErrors.push(CareerFormEnum.codeSniese);
    if (this.nameField.errors) this.formErrors.push(CareerFormEnum.name);
    if (this.shortNameField.errors) this.formErrors.push(CareerFormEnum.shortName);
    if (this.degreeField.errors) this.formErrors.push(CareerFormEnum.degree);
    if (this.logoField.errors) this.formErrors.push(CareerFormEnum.logo);
    if (this.acronymField.errors) this.formErrors.push(CareerFormEnum.acronym);
    if (this.resolutionNumberField.errors) this.formErrors.push(CareerFormEnum.resolutionNumber);

    this.formErrors.sort();
    return this.formErrors.length === 0 && this.form.valid;
  }

  /** Load Data **/
  get(): void {
    this.careersHttpService.findOne(this.id!).subscribe((item) => {
      this.form.patchValue(item);
    });
  }

  loadStates(): void {
    this.states = this.cataloguesHttpService.findByType(CatalogueTypeEnum.CAREERS_STATE);
  }

  loadModalities(): void {
    this.modalities = this.cataloguesHttpService.findByType(CatalogueTypeEnum.CAREER_MODALITY);
  }

  /** Form Getters **/

  get isEnabledField(): AbstractControl {
    return this.form.controls['isEnabled'];
  }

  get isVisibleField(): AbstractControl {
    return this.form.controls['isVisible'];
  }

  get acronymField(): AbstractControl {
    return this.form.controls['acronym'];
  }

  get codeField(): AbstractControl {
    return this.form.controls['code'];
  }

  get codeSnieseField(): AbstractControl {
    return this.form.controls['codeSniese'];
  }

  get degreeField(): AbstractControl {
    return this.form.controls['degree'];
  }

  get logoField(): AbstractControl {
    return this.form.controls['logo'];
  }

  get nameField(): AbstractControl {
    return this.form.controls['name'];
  }

  get resolutionNumberField(): AbstractControl {
    return this.form.controls['resolutionNumber'];
  }

  get shortNameField(): AbstractControl {
    return this.form.controls['shortName'];
  }

  get stateField(): AbstractControl {
    return this.form.controls['state'];
  }

  get institutionField(): AbstractControl {
    return this.form.controls['institution'];
  }

  get modalityField(): AbstractControl {
    return this.form.controls['modality'];
  }

    protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;
}
