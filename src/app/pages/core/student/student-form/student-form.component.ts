import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PrimeIcons, MenuItem} from "primeng/api";
import {OnExitInterface} from "@utils/interfaces";
import {CatalogueModel, StudentModel} from "@models/core";
import {
  BreadcrumbService,
  CataloguesHttpService,
  CoreService,
  MessageService,
  RoutesService,
  StudentsHttpService
} from "@services/core";
import {
  BreadcrumbEnum,
  CatalogueTypeEnum,
  IconButtonActionEnum,
  LabelButtonActionEnum, SeverityButtonActionEnum,
  SkeletonEnum,
  StudentFormEnum
} from '@utils/enums';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit, OnExitInterface {
  protected readonly PrimeIcons = PrimeIcons;
  protected id: string | null = null;
  protected form: FormGroup;
  protected readonly StudentFormEnum = StudentFormEnum;
  // Foreign Keys
  protected isExecutedPractices: CatalogueModel[] = [];
  protected isExecutedCommunities: CatalogueModel[] = [];
  protected isDisabilities: CatalogueModel[] = [];
  protected isLostGratuities: CatalogueModel[] = [];
  protected isSubjectRepeats: CatalogueModel[] = [];
  protected bloodTypes: CatalogueModel[] = [];
  protected ethnicOrigins: CatalogueModel[] = [];
  protected genders: CatalogueModel[] = [];
  protected sexes: CatalogueModel[] = [];
  protected formErrors: string[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private cataloguesHttpService: CataloguesHttpService,
    protected coreService: CoreService,
    private formBuilder: FormBuilder,
    protected messageService: MessageService,
    private router: Router,
    private routesService: RoutesService,
    private studentsHttpService: StudentsHttpService
  ) {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.STUDENTS, routerLink: [this.routesService.studentsCoordinatorCareer]},
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

    if (this.id) {
      this.get();
    }

    this.loadBloodTypes();
    this.loadEthnicOrigins();
    this.loadGenders();
    this.loadSexes();
    this.loadIsExecutedPractices();
    this.loadIsExecutedCommunities();
    this.loadIsDisabilities();
    this.loadIsLostGratuities();
    this.loadIsSubjectRepeats();
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      informationStudent: this.informationStudentForm,
      user: this.userForm
    });
  }

  get userForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      email: [null, [Validators.email, Validators.required]],
      birthdate: [null, [Validators.required]],
      identification: [null, [Validators.required, Validators.pattern(/^\d{10}$/)]],
      lastname: [null, [Validators.required]],
      personalEmail: [null, [Validators.email, Validators.required]],
      phone: [null, [Validators.required, Validators.pattern(/^09\d{8}$/)]],
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      bloodType: [null, [Validators.required]],
      ethnicOrigin: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      sex: [null, [Validators.required]]
    });
  }

  get informationStudentForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      isExecutedPractice: [null, [Validators.required]],
      isExecutedCommunity: [null, [Validators.required]],
      isDisability: [null, [Validators.required]],
      isLostGratuity: [null, [Validators.required]],
      isSubjectRepeat: [null, [Validators.required]],
      address: [null, [Validators.required]],
      community: [null, [Validators.required]],
      contactEmergencyName: [null, [Validators.required]],
      contactEmergencyKinship: [null, [Validators.required]],
      contactEmergencyPhone: [null, [Validators.required, Validators.pattern(/^09\d{8}$/)]],
      disabilityPercentage: [null, [Validators.required]],
      economicAmount: [null, [Validators.required]],
      educationalAmount: [null, [Validators.required]],
      familyIncome: [null, [Validators.required]],
      financingScholarshipType: [null, [Validators.required]],
      membersHouseNumber: [null, [Validators.required]],
      practiceHours: [null, [Validators.required]],
      postalCode: [null, [Validators.required]],
      scholarshipAmount: [null, [Validators.required]],
      tariffScholarshipPercentage: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    // if (this.form.valid) {
    //   if (this.id) {
    //     this.update(this.form.value);
    //   } else {
    //     this.create(this.form.value);
    //   }
    // } else {
    //   this.form.markAllAsTouched();
    //   this.messageService.errorsFields();
    // }
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
    this.router.navigate([this.routesService.studentsCoordinatorCareer]);
  }



  /** Actions **/
  create(student: StudentModel): void {
    this.studentsHttpService.create(student).subscribe(() => {
      this.form.reset();
      this.back();
    });
  }

  update(student: StudentModel): void {
    this.studentsHttpService.update(this.id!, student).subscribe(() => {
      this.form.reset();
      this.back();
    });
  }
/**validate form */
get validateForm() {
  this.formErrors = [];

  // if (this.codeField.errors) this.formErrors.push(StudentFormEnum.code);
  // if (this.codeSnieseField.errors) this.formErrors.push(StudentFormEnum.codeSniese);
  // if (this.nameField.errors) this.formErrors.push(StudentFormEnum.name);
  // if (this.shortNameField.errors) this.formErrors.push(StudentFormEnum.shortName);
  // if (this.degreeField.errors) this.formErrors.push(StudentFormEnum.degree);
  // if (this.logoField.errors) this.formErrors.push(StudentFormEnum.logo);
  // if (this.acronymField.errors) this.formErrors.push(StudentFormEnum.acronym);
  // if (this.resolutionNumberField.errors) this.formErrors.push(StudentFormEnum.resolutionNumber);

  this.formErrors.sort();
  return this.formErrors.length === 0 && this.form.valid;
}
  /** Load Data **/
  get(): void {
    this.studentsHttpService.findOne(this.id!).subscribe((student) => {
      this.form.patchValue(student);
    });
  }

  loadBloodTypes(): void {
    this.bloodTypes = this.cataloguesHttpService.findByType(CatalogueTypeEnum.BLOOD_TYPE);
  }

  loadEthnicOrigins(): void {
    this.ethnicOrigins = this.cataloguesHttpService.findByType(CatalogueTypeEnum.ETHNIC_ORIGIN);
  }

  loadGenders(): void {
    this.genders = this.cataloguesHttpService.findByType(CatalogueTypeEnum.GENDER);
  }

  loadSexes(): void {
    this.sexes = this.cataloguesHttpService.findByType(CatalogueTypeEnum.SEX);
  }

  loadIsExecutedPractices(): void {
    this.isExecutedPractices = this.cataloguesHttpService.findByType(CatalogueTypeEnum.YES_NO_NA);
  }

  loadIsExecutedCommunities(): void {
    this.isExecutedCommunities = this.cataloguesHttpService.findByType(CatalogueTypeEnum.YES_NO_NA);
  }

  loadIsDisabilities(): void {
    this.isDisabilities = this.cataloguesHttpService.findByType(CatalogueTypeEnum.YES_NO_NA);
  }

  loadIsLostGratuities(): void {
    this.isLostGratuities = this.cataloguesHttpService.findByType(CatalogueTypeEnum.YES_NO_NA);
  }

  loadIsSubjectRepeats(): void {
    this.isSubjectRepeats = this.cataloguesHttpService.findByType(CatalogueTypeEnum.YES_NO_NA);
  }
 /** Validations **/
    //validateForm() {
      // this.formErrors = [];

      // if (this.acronymField.errors) this.formErrors.push(InformationStudentEnum.acronym);
      // if (this.cellphoneField.errors) this.formErrors.push(InformationStudentEnum.cellphone);
      // if (this.codeField.errors) this.formErrors.push(InformationStudentEnum.code);
      // if (this.codeSnieseField.errors) this.formErrors.push(InformationStudentEnum.codeSniese);
      // if (this.denominationField.errors) this.formErrors.push(InformationStudentEnum.denomination);
      // if (this.emailField.errors) this.formErrors.push(InformationStudentEnum.email);
      // if (this.isVisibleField.errors) this.formErrors.push('Es Visible');
      // if (this.logoField.errors) this.formErrors.push(InformationStudentEnum.logo);
      // if (this.nameField.errors) this.formErrors.push(InformationStudentEnum.name);
      // if (this.phoneField.errors) this.formErrors.push(InformationStudentEnum.phone);
      // if (this.shortNameField.errors) this.formErrors.push(InformationStudentEnum.shortName);
      // if (this.sloganField.errors) this.formErrors.push(InformationStudentEnum.slogan);
      // if (this.stateField.errors) this.formErrors.push('Estado');
      // if (this.webField.errors) this.formErrors.push(InstitutionFormEnum.web);

      // this.formErrors.sort();
      // return this.formErrors.length === 0 && this.form.valid;
    //}
  /** Student Form **/
  get informationStudentField(): FormGroup {
    return this.form.controls['informationStudent'] as FormGroup;
  }

  get userField(): FormGroup {
    return this.form.controls['user'] as FormGroup;
  }

  /** User Form **/
  get emailField(): AbstractControl {
    return this.userField.controls['email'];
  }

  get birthdateField(): AbstractControl {
    return this.userField.controls['birthdate'];
  }

  get identificationField(): AbstractControl {
    return this.userField.controls['identification'];
  }

  get lastnameField(): AbstractControl {
    return this.userField.controls['lastname'];
  }

  get personalEmailField(): AbstractControl {
    return this.userField.controls['personalEmail'];
  }

  get phoneField(): AbstractControl {
    return this.userField.controls['phone'];
  }

  get nameField(): AbstractControl {
    return this.userField.controls['name'];
  }

  get usernameField(): AbstractControl {
    return this.userField.controls['username'];
  }

  get bloodTypeField(): AbstractControl {
    return this.userField.controls['bloodType'];
  }

  get ethnicOriginField(): AbstractControl {
    return this.userField.controls['ethnicOrigin'];
  }

  get genderField(): AbstractControl {
    return this.userField.controls['gender'];
  }

  get sexField(): AbstractControl {
    return this.userField.controls['sex'];
  }

  /** Information Student Form **/
  get addressField(): AbstractControl {
    return this.informationStudentField.controls['address'];
  }

  get isExecutedPracticeField(): AbstractControl {
    return this.informationStudentField.controls['isExecutedPractice'];
  }

  get isExecutedCommunityField(): AbstractControl {
    return this.informationStudentField.controls['isExecutedCommunity'];
  }

  get isDisabilityField(): AbstractControl {
    return this.informationStudentField.controls['isDisability'];
  }

  get isLostGratuityField(): AbstractControl {
    return this.informationStudentField.controls['isLostGratuity'];
  }

  get isSubjectRepeatField(): AbstractControl {
    return this.informationStudentField.controls['isSubjectRepeat'];
  }


  get communityField(): AbstractControl {
    return this.informationStudentField.controls['community'];
  }

  get contactEmergencyNameField(): AbstractControl {
    return this.informationStudentField.controls['contactEmergencyName'];
  }

  get contactEmergencyKinshipField(): AbstractControl {
    return this.informationStudentField.controls['contactEmergencyKinship'];
  }

  get contactEmergencyPhoneField(): AbstractControl {
    return this.informationStudentField.controls['contactEmergencyPhone'];
  }

  get disabilityPercentageField(): AbstractControl {
    return this.informationStudentField.controls['disabilityPercentage'];
  }

  get economicAmountField(): AbstractControl {
    return this.informationStudentField.controls['economicAmount'];
  }

  get educationalAmountField(): AbstractControl {
    return this.informationStudentField.controls['educationalAmount'];
  }

  get familyIncomeField(): AbstractControl {
    return this.informationStudentField.controls['familyIncome'];
  }

  get financingScholarshipTypeField(): AbstractControl {
    return this.informationStudentField.controls['financingScholarshipType'];
  }

  get membersHouseNumberField(): AbstractControl {
    return this.informationStudentField.controls['membersHouseNumber'];
  }

  get practiceHoursField(): AbstractControl {
    return this.informationStudentField.controls['practiceHours'];
  }

  get postalCodeField(): AbstractControl {
    return this.informationStudentField.controls['postalCode'];
  }

  get scholarshipAmountField(): AbstractControl {
    return this.informationStudentField.controls['scholarshipAmount'];
  }

  get tariffScholarshipPercentageField(): AbstractControl {
    return this.informationStudentField.controls['tariffScholarshipPercentage'];
  }

  protected readonly SkeletonEnum = SkeletonEnum;
    protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;
}
