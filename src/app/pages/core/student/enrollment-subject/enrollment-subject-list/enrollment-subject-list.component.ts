import {Component, inject, OnInit} from '@angular/core';
import {
  BreadcrumbService, CareersService,
  CoreService,
  MessageService,
  RoutesService,
  SchoolPeriodsService,
  StudentsHttpService,
  TeacherDistributionsHttpService,
  TeacherDistributionsService
} from "@services/core";
import {BreadcrumbEnum, SkeletonEnum} from "@utils/enums";
import {FormControl} from "@angular/forms";
import {EnrollmentDetailModel, SchoolPeriodModel, TeacherDistributionModel} from "@models/core";
import {AuthService} from "@services/auth";
import {Router} from "@angular/router";
import {PrimeIcons} from "primeng/api";

@Component({
  selector: 'app-enrollment-subject-list',
  templateUrl: './enrollment-subject-list.component.html',
  styleUrls: ['./enrollment-subject-list.component.scss']
})
export class EnrollmentSubjectListComponent implements OnInit{
  protected readonly careersService = inject(CareersService);
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected selectedSchoolPeriod: FormControl = new FormControl();
  protected selectedCareer: FormControl = new FormControl();
  protected schoolPeriods: SchoolPeriodModel[] = [];
  protected enrollmentDetails: EnrollmentDetailModel[] = [];

  constructor(
    protected readonly authService: AuthService,
    private readonly router: Router,
    private readonly routesService: RoutesService,
    private readonly schoolPeriodsService: SchoolPeriodsService,
    private readonly teacherDistributionsHttpService: TeacherDistributionsHttpService,
    private readonly teacherDistributionsService: TeacherDistributionsService,
    private readonly studentsHttpService: StudentsHttpService,
    private readonly breadcrumbService: BreadcrumbService,
    protected readonly coreService: CoreService,
    protected readonly messageService: MessageService,
  ) {
    this.breadcrumbService.setItems([{label: BreadcrumbEnum.TEACHER_DISTRIBUTIONS}]);
  }

  ngOnInit(): void {
    this.selectedCareer.patchValue(this.careersService.career);

    this.selectedSchoolPeriod.valueChanges.subscribe(value => {
      this.findEnrollmentSubjectsByStudent();
    });

    this.selectedCareer.valueChanges.subscribe(value => {
      this.findEnrollmentSubjectsByStudent();
    });

    this.schoolPeriods = [this.schoolPeriodsService.openSchoolPeriod];

    this.selectedSchoolPeriod.patchValue(this.schoolPeriodsService.openSchoolPeriod);
  }

  findEnrollmentSubjectsByStudent() {
    this.studentsHttpService.findEnrollmentSubjectsByStudent(
      this.authService.auth.student.id!,
      this.selectedSchoolPeriod.value.id,
      this.selectedCareer.value.id)
      .subscribe(enrollmentDetails => {
        this.enrollmentDetails = enrollmentDetails;
      });
  }

  redirectTeacherDistributionGrades(item: TeacherDistributionModel) {
    this.teacherDistributionsService.teacherDistribution = item;
    this.router.navigate([this.routesService.teacherDistributionsGrades]);
  }
}
