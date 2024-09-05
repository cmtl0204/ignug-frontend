import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {
  CareersHttpService,
  CareersService, CataloguesHttpService,
  CoreService,
  CurriculumsHttpService,
  CurriculumsService,
  EnrollmentsHttpService,
  MessageService, SchoolPeriodsService, StudentsHttpService, SubjectsService
} from "@services/core";
import {MenuItem, PrimeIcons} from 'primeng/api';
import {
  ColumnModel,
  SubjectModel,
  CurriculumModel,
  CareerModel,
  StudentModel,
  CatalogueModel,
  EnrollmentModel,
  SchoolPeriodModel, CareerParallelModel, EnrollmentDetailModel
} from '@models/core';
import {
  IdButtonActionEnum,
  LabelButtonActionEnum,
  IconButtonActionEnum,
  ClassButtonActionEnum,
  CatalogueTypeEnum, CatalogueEnrollmentStateEnum, EnrollmentSateEnum, SeverityButtonActionEnum
} from "@utils/enums";
import {AuthService} from "@services/auth";

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  @Output() nextOut: EventEmitter<number> = new EventEmitter<number>();
  @Output() previousOut: EventEmitter<number> = new EventEmitter<number>();
  // Reference Prime Icons
  protected readonly PrimeIcons = PrimeIcons;

  // Button Actions Enum
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly ClassButtonActionEnum = ClassButtonActionEnum;

  protected buttonActions: MenuItem[] = [];

  // Columns of table
  protected columns: ColumnModel[] = this.buildColumns;

  // Flag actions buttons is enabled
  protected isButtonActions: boolean = false;

  // Flag upload files is enabled
  protected isFileList: boolean = false;

  // Administrator Data
  protected selectedItem!: SubjectModel;
  protected selectedItems: SubjectModel[] = [];
  protected subjects: SubjectModel[] = [];
  protected subjectsClone: SubjectModel[] = [];
  protected enrollmentDetails: EnrollmentDetailModel[] = [];

  // Foreign Keys
  protected selectedCurriculum: FormControl = new FormControl();
  protected careers: CareerModel[] = [];
  protected curriculums: CurriculumModel[] = [];
  protected workdays: CatalogueModel[] = [];
  protected parallels: CatalogueModel[] = [];
  protected schoolPeriods: SchoolPeriodModel[] = [];
  protected academicPeriods: CatalogueModel[] = [];
  protected careerParallels: CareerParallelModel[] = [];
  protected academicPeriod: FormControl = new FormControl();

  protected student!: StudentModel;
  protected totalCredits: number = 0;
  protected enrollment!: EnrollmentModel;

  protected form: FormGroup;
  protected formErrors: string[] = [];

  constructor(
    private readonly authService: AuthService,
    protected readonly coreService: CoreService,
    private readonly careersService: CareersService,
    private readonly cataloguesHttpService: CataloguesHttpService,
    private readonly curriculumsHttpService: CurriculumsHttpService,
    private readonly curriculumsService: CurriculumsService,
    private readonly subjectsService: SubjectsService,
    private readonly enrollmentsHttpService: EnrollmentsHttpService,
    private readonly formBuilder: FormBuilder,
    private readonly studentsHttpService: StudentsHttpService,
    protected readonly messageService: MessageService,
    protected readonly schoolPeriodsService: SchoolPeriodsService,
    protected readonly careersHttpService: CareersHttpService,
  ) {
    this.student = authService.auth.student;
    if (subjectsService.enrollmentSubjects)
      this.selectedItems = subjectsService.enrollmentSubjects;

    this.careers = [this.careersService.career];

    this.form = this.newForm;

    this.careerField.patchValue(this.careersService.career);

    this.curriculums = this.careersService.career.curriculums;

    this.schoolPeriods = [this.schoolPeriodsService.openSchoolPeriod];
    this.schoolPeriodField.patchValue(this.schoolPeriodsService.openSchoolPeriod);

    if (this.curriculums.length > 0) {
      this.selectedCurriculum.patchValue(this.curriculums[0]);
      this.curriculumsService.curriculum = this.curriculums[0];
      this.findSubjectsByCurriculum();
    }

    this.careerField.valueChanges.subscribe(selectedCareer => {
      this.subjects = [];
      this.curriculumsService.curriculum = {};

      if (selectedCareer.curriculums.length > 0) {
        this.selectedCurriculum.patchValue(selectedCareer.curriculums[0]);
        this.curriculumsService.curriculum = selectedCareer.curriculums[0];
        this.curriculums = selectedCareer.curriculums;
        this.findSubjectsByCurriculum();
      }
    });

    this.workdayField.valueChanges.subscribe(value => {
      // this.parallels = this.cataloguesHttpService.findByType(CatalogueTypeEnum.PARALLEL).filter(parallel => parallel.parentId === value.id);

      this.parallels = (this.careerParallels.filter(careerParallel => careerParallel.parallel.parentId === this.workdayField.value.id))
        .map(careerParallel => {
          return careerParallel.parallel;
        });
    });

    this.academicPeriod.valueChanges.subscribe(value => {
      this.subjects = this.subjectsClone.filter(subject => subject.academicPeriod.id === value.id);
    });
  }

  ngOnInit(): void {
    this.findEnrollmentByStudent();
    this.selectedCurriculum.disable();

    this.loadWorkdays();
    this.loadAcademicPeriods();
    this.loadCareerParallels();
  }

  get newForm() {
    return this.formBuilder.group({
      student: [this.student, [Validators.required]],
      academicPeriod: [null, [Validators.required]],
      career: [null, [Validators.required]],
      enrollmentDetails: [[], [Validators.required]],
      parallel: [null, [Validators.required]],
      schoolPeriod: [null, [Validators.required]],
      workday: [null, [Validators.required]],
    })
  }

  get buildColumns(): ColumnModel[] {
    return [
      {field: 'code', header: 'Código'},
      {field: 'name', header: 'Nombre'},
      {field: 'hours', header: 'Horas Doc. / Prac. / Aut.'},
      {field: 'academicPeriod', header: 'Nivel'},
      {field: 'academicState', header: 'Estado académicos'},
      {field: 'state', header: 'Estado matrícula'}
    ];
  }

  get buildButtonActions() {
    return [
      {
        id: IdButtonActionEnum.UPDATE,
        label: LabelButtonActionEnum.UPDATE,
        icon: IconButtonActionEnum.UPDATE,
        command: () => {
          // if (this.selectedItem?.id) this.redirectEditForm(this.selectedItem.id);
        },
      },
      {
        id: IdButtonActionEnum.HIDE,
        label: LabelButtonActionEnum.HIDE,
        icon: IconButtonActionEnum.HIDE,
        command: () => {
          // if (this.selectedItem?.id) this.hide(this.selectedItem.id);
        },
      },
      {
        id: IdButtonActionEnum.REACTIVATE,
        label: LabelButtonActionEnum.REACTIVATE,
        icon: IconButtonActionEnum.REACTIVATE,
        command: () => {
          // if (this.selectedItem?.id) this.reactivate(this.selectedItem.id);
        },

      },
      {
        id: IdButtonActionEnum.FILE_LIST,
        label: LabelButtonActionEnum.FILE_LIST,
        icon: IconButtonActionEnum.FILE_LIST,
        command: () => {
          if (this.selectedItem?.id) this.isFileList = true;
        },

      }
    ];
  }

  /** Load Data **/
  findSubjectsByCurriculum() {
    this.curriculumsHttpService.findSubjectsByCurriculum(this.selectedCurriculum.value.id)
      .subscribe(subjects => {
        this.subjects = subjects.filter(subject => subject)
        this.subjects = subjects.sort(function (a, b) {
          if (a.academicPeriod.code > b.academicPeriod.code) {
            return 1;
          }
          if (a.academicPeriod.code < b.academicPeriod.code) {
            return -1;
          }
          return 0;
        });

        this.subjectsClone = this.subjects;

        this.findEnrollmentDetailByStudent();
      });
  }

  findEnrollmentDetailByStudent() {
    this.selectedItems = [];

    this.studentsHttpService.findEnrollmentDetailsByStudent(this.student.id)
      .subscribe(enrollmentDetails => {
        this.enrollmentDetails = enrollmentDetails;

        for (const subject of this.subjects) {
          for (const enrollmentDetail of enrollmentDetails) {
            if (subject.id === enrollmentDetail.subjectId) {
              subject.academicState = enrollmentDetail.academicState?.code;
              if (!(enrollmentDetail.academicState?.code === 'r'
                && enrollmentDetail.enrollmentDetailState.state.code === CatalogueEnrollmentStateEnum.ENROLLED)) {
                subject.enrollmentStates = enrollmentDetail.enrollmentDetailStates;
                subject.enrollmentState = enrollmentDetail.enrollmentDetailState;
              }

              if (enrollmentDetail.enrollmentDetailState.state.code === CatalogueEnrollmentStateEnum.REGISTERED) {
                this.selectedItems.push(subject);
                subject.enabled = true;
              }
            }
          }
        }

        const enrollmentDetailLeveling = this.subjects.filter(enrollmentDetail => enrollmentDetail.type.code === 'leveling');

        const enrollmentDetailCareer = this.subjects.filter(enrollmentDetail => enrollmentDetail.type.code !== 'leveling');

        const approvedLeveling = enrollmentDetailLeveling.every(enrollmentDetail => enrollmentDetail.academicState === 'a');

        const approvedAny = enrollmentDetailCareer.some(enrollmentDetail => enrollmentDetail.academicState === 'a');

        if (approvedAny || approvedLeveling) {
          this.subjects = this.subjects.filter(item => {
              return item.type.code != 'leveling'
            }
          );
        } else {
          this.subjects = this.subjects.filter(item => item.type.code === 'leveling');
        }

        this.subjects = this.subjects.filter(item => item.academicState != 'a');

        // this.subjects = this.subjects.map(subject=> {
        //   const {enrollmentState, } = ...subject
        //   return {
        //     ...subject
        //   }
        // })

        // this.items = subjects.sort(function (a, b) {
        //   if (a.academicPeriod.code > b.academicPeriod.code) {
        //     return 1;
        //   }
        //   if (a.academicPeriod.code < b.academicPeriod.code) {
        //     return -1;
        //   }
        //   return 0;
        // });

        this.selectItems();
      });
  }

  findEnrollmentByStudent() {
    this.studentsHttpService.findEnrollmentByStudent(this.student.id)
      .subscribe(enrollment => {
        this.enrollment = enrollment;

        if (this.enrollment) {
          this.workdayField.patchValue(enrollment.workday);
          this.parallelField.patchValue(enrollment.parallel);
          this.academicPeriod.patchValue(enrollment.academicPeriod);

          if (this.enrollment?.enrollmentState) {
            const registeredState = this.enrollment.enrollmentState.state.code === CatalogueEnrollmentStateEnum.REGISTERED;

            if (registeredState) { //reviewer
              this.form.enable();
              this.workdayField.enable();
              this.parallelField.enable();
            } else {
              this.form.disable();
              this.workdayField.disable();
              this.parallelField.disable();
              this.academicPeriod.disable();
            }
          }
        }
      });
  }

  loadCareerParallels(): void {
    this.careersHttpService.findParallelsByCareer(this.careerField.value.id)
      .subscribe(careerParallels => {
        this.careerParallels = careerParallels;
      });
  }

  loadWorkdays(): void {
    this.workdays = this.cataloguesHttpService.findByType(CatalogueTypeEnum.ENROLLMENTS_WORKDAY);
  }

  loadAcademicPeriods(): void {
    this.academicPeriods = this.cataloguesHttpService.findByType(CatalogueTypeEnum.ACADEMIC_PERIOD);
  }

  /** Actions **/
  onSubmit(): void {
    this.enrollmentDetailsField.patchValue(this.selectedItems);
    this.calculateAcademicPeriod();

    if (this.validateForm()) {
      this.sendRegistration();
    } else {
      this.form.markAllAsTouched();
      this.messageService.errorsFields(this.formErrors);
    }
  }

  validateForm() {
    this.formErrors = [];

    // if (this.academicPeriodField.errors) this.formErrors.push('Nivel Académico');
    if (this.careerField.errors) this.formErrors.push('Carrera');
    if (this.enrollmentDetailsField.errors) this.formErrors.push('Asignaturas');
    if (this.workdayField.errors) this.formErrors.push('Jornada');
    if (this.parallelField.errors) this.formErrors.push('Paralelo');
    if (this.schoolPeriodField.errors) this.formErrors.push('Periodo Lectivo');
    // if (this.studentField.errors) this.formErrors.push('Estudiante');

    this.formErrors.sort();
    return this.formErrors.length === 0 && this.form.valid;
  }

  sendRegistration() {
    this.enrollmentsHttpService.sendRegistration(this.form.value).subscribe(enrollment => {
      this.findSubjectsByCurriculum();
      this.next();
    });
  }

  calculateAcademicPeriod() {
    this.selectedItems.sort(function (a, b) {
      if (a.academicPeriod.code > b.academicPeriod.code) {
        return 1;
      }
      if (a.academicPeriod.code < b.academicPeriod.code) {
        return -1;
      }
      return 0;
    });

    if (this.selectedItems.length > 0)
      this.academicPeriodField.patchValue(this.selectedItems[0].academicPeriod);
  }

  validateSubjectPrerequisites(subject: SubjectModel) {
    if (this.selectedItems.length >= 7) {
      this.messageService.errorCustom('Número máximo de asignaturas alcanzadas', 'El máximo es 7 asignaturas');
      return;
    }

    let valid = true;
    let existSubject = false;
    let prerequisites = '';
    let namePrerequisite = '';

    for (const subjectPrerequisite of subject.subjectPrerequisites) {
      namePrerequisite = `(${subjectPrerequisite.requirement.code}) ${subjectPrerequisite.requirement.name}`;

      for (const enrollmentDetail of this.enrollmentDetails) {
        if (subjectPrerequisite.requirement.id === enrollmentDetail.subjectId) {
          existSubject = true;

          if (!enrollmentDetail.academicState?.code || enrollmentDetail.academicState?.code === 'r') {
            prerequisites += '\n' + namePrerequisite;
            valid = false;
          }
        }
      }

      if (!existSubject) {
        prerequisites += '\n' + namePrerequisite;
        valid = false;
      }

      existSubject = false;
    }

    if (!valid) {
      this.messageService.errorCustom('No cumple con los prerequisitos de la asignatura', prerequisites);
      return;
    }

    const indexSubject = this.subjects.findIndex(item => item.id === subject.id);

    this.subjects[indexSubject].enabled = valid;

    const indexSelectedItem = this.selectedItems.findIndex(item => item.id === subject.id);

    if (indexSelectedItem === -1) {
      this.selectedItems.push(this.subjects[indexSubject]);
    }
  }

  removeSelectedSubject(subject: SubjectModel) {
    const indexSubject = this.subjects.findIndex(item => item.id === subject.id);
    const indexSelectedItem = this.selectedItems.findIndex(item => item.id === subject.id);

    if (indexSelectedItem > -1) {
      this.subjects[indexSubject].enabled = false;
      this.selectedItems.splice(indexSelectedItem, 1);
    }
  }

  /** Select **/
  selectItem(item: SubjectModel) {
    this.isButtonActions = true;
    this.selectedItem = item;
    // this.subjectsService.subject = item;
    // this.validateButtonActions(item);
  }

  selectItems() {
    this.selectedItems = [...(new Set(this.selectedItems))];
    // this.totalCredits = this.selectedItems.reduce((accumulator, currentValue) => accumulator + currentValue.credits, 0);
    this.subjectsService.enrollmentSubjects = this.selectedItems;
  }

  previous() {
    this.previousOut.emit(-1);
  }

  next() {
    this.nextOut.emit(1);
  }

  /** Getteres Form **/

  get academicPeriodField() {
    return this.form.controls['academicPeriod'];
  }

  get careerField() {
    return this.form.controls['career'];
  }

  get parallelField() {
    return this.form.controls['parallel'];
  }

  get schoolPeriodField() {
    return this.form.controls['schoolPeriod'];
  }

  get workdayField() {
    return this.form.controls['workday'];
  }

  get enrollmentDetailsField() {
    return this.form.controls['enrollmentDetails'];
  }

  get studentField() {
    return this.form.controls['student'];
  }

  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;
}
