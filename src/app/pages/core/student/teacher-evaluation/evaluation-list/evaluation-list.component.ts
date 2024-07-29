import {Component, inject, Input, OnInit} from '@angular/core';
import {PrimeIcons} from "primeng/api";
import {
  BreadcrumbService,
  CoreService,
  MessageDialogService,
  RoutesService, SchoolPeriodsService
} from "@services/core";
import {
  AutoEvaluationsHttpService,
  PartnerEvaluationsHttpService,
  ResultsHttpService, StudentEvaluationsHttpService
} from "@services/teacher-evaluation";
import {ColumnModel} from "@models/core";
import {
  AutoEvaluationModel,
  PartnerEvaluationModel,
  ResultModel, StudentEvaluationModel
} from "@models/teacher-evaluation";
import {BreadcrumbEnum} from "@utils/enums";
import {AuthService} from "@services/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-evaluation-list',
  templateUrl: './evaluation-list.component.html',
  styleUrl: './evaluation-list.component.scss'
})
export class EvaluationListComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly schoolPeriodsService = inject(SchoolPeriodsService);
  private readonly studentEvaluationsHttpService = inject(StudentEvaluationsHttpService);
  private readonly partnerEvaluationsHttpService = inject(PartnerEvaluationsHttpService);
  protected readonly coreService = inject(CoreService);
  protected readonly messageDialogService = inject(MessageDialogService);
  private readonly router = inject(Router);

  protected columns: ColumnModel[] = [];
  @Input() id: string = '';
  protected studentEvaluations: StudentEvaluationModel[] = [];

  protected readonly PrimeIcons = PrimeIcons;

  constructor() {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.TEACHER_EVALUATIONS},
    ]);
    this.buildColumns();
  }

  ngOnInit(): void {
    this.findAutoEvaluationsByEvaluator();
  }

  findAutoEvaluationsByEvaluator() {
    this.studentEvaluationsHttpService.findStudentEvaluationsByEvaluator(
      this.authService.auth.id,
      this.schoolPeriodsService.openSchoolPeriod.id)
      .subscribe(response => {
        this.studentEvaluations = response;
      });
  }

  buildColumns() {
    this.columns = [
      {field: 'name', header: 'Pregunta'},
    ];
  }

  redirectEvaluationForm(studentEvaluation: StudentEvaluationModel) {
    this.router.navigate(['/core/student/teacher-evaluations/student-evaluations',
      studentEvaluation.id], {queryParams: {evaluationTypeId: studentEvaluation.evaluationType?.id}}
    );
  }
}
