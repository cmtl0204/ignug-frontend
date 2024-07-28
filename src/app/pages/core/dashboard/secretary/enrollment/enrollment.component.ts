import {Component, inject, OnInit} from '@angular/core';
import {
  CareersService,
  CataloguesHttpService,
  DashboardsHttpService,
  SchoolPeriodsHttpService,
  SchoolPeriodsService
} from "@services/core";
import {FormControl} from "@angular/forms";
import {CatalogueModel, SchoolPeriodModel} from "@models/core";
import {CatalogueEnrollmentStateEnum, CatalogueTypeEnum, EnrollmentEnum, EnrollmentSateEnum} from "@utils/enums";

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrl: './enrollment.component.scss'
})
export class EnrollmentComponent implements OnInit {
  protected readonly careersService = inject(CareersService);
  protected readonly schoolPeriodsService = inject(SchoolPeriodsService);
  protected readonly dashboardsHttpService = inject(DashboardsHttpService);
  protected readonly schoolPeriodsHttpService = inject(SchoolPeriodsHttpService);
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  protected schoolPeriods: SchoolPeriodModel[] = [];
  protected enrollmentStates: CatalogueModel[] = [];
  protected selectedCareerId: FormControl = new FormControl();
  protected selectedSchoolPeriodId: FormControl = new FormControl();
  protected selectedEnrollmentState: FormControl = new FormControl();
  protected basicDataEnrollments: any;
  protected basicOptionsEnrollments: any;
  protected basicDataSexes: any;
  protected basicOptionsSexes: any;
  protected basicDataEthnicOrigins: any;
  protected basicOptionsEthnicOrigins: any;

  ngOnInit() {
    this.findSchoolPeriods();
    this.findEnrollmentStates();

    this.selectedSchoolPeriodId.valueChanges.subscribe(value => {
      this.findEnrolledStudents();
      this.findEnrolledStudentsForSex();
      this.findEnrolledStudentsForEthnicOrigins();
    });

    this.selectedCareerId.valueChanges.subscribe(value => {
      this.findEnrolledStudents();
      this.findEnrolledStudentsForSex();
      this.findEnrolledStudentsForEthnicOrigins();
    });

    this.selectedEnrollmentState.valueChanges.subscribe(value => {
      this.findEnrolledStudents();
      this.findEnrolledStudentsForSex();
      this.findEnrolledStudentsForEthnicOrigins();
    });
  }

  drawChartEnrollments(data: any[]) {
    const enrollmentState = data.filter(item => item.stateCode === this.selectedEnrollmentState.value.code);

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.basicDataEnrollments = {
      labels: enrollmentState.map(career => career.careerShortName),
      datasets: [
        {
          label: this.selectedEnrollmentState.value.name,
          data: enrollmentState.map(career => career.total),
          backgroundColor: [
            documentStyle.getPropertyValue('--primary-500'),
            documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--cyan-500'),
            documentStyle.getPropertyValue('--pink-500'),
            documentStyle.getPropertyValue('--indigo-500'),
            documentStyle.getPropertyValue('--teal-500'),
            documentStyle.getPropertyValue('--orange-500'),
            documentStyle.getPropertyValue('--bluegray-500'),
            documentStyle.getPropertyValue('--purple-500'),
          ],
        }
      ]
    };

    this.basicOptionsEnrollments = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      }
    };
  }

  drawChartSexes(data: any[]) {
    const enrollmentState = data.filter(item => item.stateCode === this.selectedEnrollmentState.value.code);
    const males = enrollmentState.filter(item => item.sexCode === '1');
    const females = enrollmentState.filter(item => item.sexCode === '2');

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.basicDataSexes = {
      labels: males.map(career => career.careerShortName),
      datasets: [
        {
          label: 'Hombres',
          data: males.map(career => career.total),
          backgroundColor: [
            documentStyle.getPropertyValue('--primary-500'),
          ],
        },
        {
          label: 'Mujeres',
          data: females.map(career => career.total),
          backgroundColor: [
            documentStyle.getPropertyValue('--yellow-500'),
          ],
        },
      ]
    };

    this.basicOptionsSexes = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      }
    };
  }

  drawChartEthnicOrigins(data: any[]) {
    const enrollmentState = data.filter(item => item.stateCode === this.selectedEnrollmentState.value.code);

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.basicDataEthnicOrigins = {
      labels: enrollmentState.map(item => item.ethnicOriginName),
      datasets: [
        {
          label: 'Etnias',
          data: enrollmentState.map(career => career.total),
          backgroundColor: [
            documentStyle.getPropertyValue('--primary-500'),
          ],
        }
      ]
    };

    this.basicOptionsEthnicOrigins = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      }
    };
  }

  findEnrolledStudents() {
    this.dashboardsHttpService.findEnrolledStudents(this.selectedCareerId.value, this.selectedSchoolPeriodId.value).subscribe(response => {
      this.drawChartEnrollments(response);
    });
  }

  findEnrolledStudentsForSex() {
    this.dashboardsHttpService.findEnrolledStudentsForSex(this.selectedCareerId.value, this.selectedSchoolPeriodId.value).subscribe(response => {
      this.drawChartSexes(response);
    });
  }

  findEnrolledStudentsForEthnicOrigins() {
    this.dashboardsHttpService.findEnrolledStudentsForEthnicOrigins(this.selectedCareerId.value, this.selectedSchoolPeriodId.value).subscribe(response => {
      this.drawChartEthnicOrigins(response);
    });
  }

  findSchoolPeriods() {
    this.schoolPeriodsHttpService.findAll().subscribe(schoolPeriods => {
      this.schoolPeriods = schoolPeriods;
      this.selectedSchoolPeriodId.patchValue(this.schoolPeriods[0].id);
    })
  }

  findEnrollmentStates() {
    this.enrollmentStates = this.cataloguesHttpService.findByType(CatalogueTypeEnum.ENROLLMENTS_STATE);
    this.selectedEnrollmentState.patchValue(this.enrollmentStates.find(enrollmentStates => enrollmentStates.code === CatalogueEnrollmentStateEnum.ENROLLED))
  }
}
