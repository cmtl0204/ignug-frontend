import {Component, inject, Input, OnInit} from '@angular/core';
import {PrimeIcons} from "primeng/api";
import {
  BreadcrumbService,
  CoreService,
  EvaluationsHttpService,
  MessageDialogService,
  RoutesService, SchoolPeriodsHttpService, SchoolPeriodsService
} from "@services/core";
import {
  AutoEvaluationsHttpService,
  PartnerEvaluationsHttpService,
  QuestionsHttpService,
  ResultsHttpService
} from "@services/teacher-evaluation";
import {ColumnModel} from "@models/core";
import {
  AutoEvaluationModel,
  PartnerEvaluationModel,
  QuestionModel,
  ResponseModel,
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
  private readonly autoEvaluationsHttpService = inject(AutoEvaluationsHttpService);
  private readonly partnerEvaluationsHttpService = inject(PartnerEvaluationsHttpService);
  protected readonly coreService = inject(CoreService);
  private readonly router = inject(Router);

  protected columns: ColumnModel[] = [];
  @Input() id: string = '';
  protected autoEvaluation!: AutoEvaluationModel;
  protected partnerEvaluation!: PartnerEvaluationModel;
  protected results: ResultModel[] = [];

  protected readonly PrimeIcons = PrimeIcons;

  constructor() {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.TEACHER_EVALUATIONS},
    ]);
    this.buildColumns();
  }

  ngOnInit(): void {
    this.findAutoEvaluationByEvaluated();
    this.findPartnerEvaluationByEvaluated();
  }

  findAutoEvaluationByEvaluated() {
    this.autoEvaluationsHttpService.findAutoEvaluationByEvaluated(
      this.authService.auth.id,
      this.schoolPeriodsService.openSchoolPeriod.id)
      .subscribe(response => {
        this.autoEvaluation = response;
      });
  }

  findPartnerEvaluationByEvaluated() {
    this.partnerEvaluationsHttpService.findPartnerEvaluationByEvaluator(
      this.authService.auth.id,
      this.schoolPeriodsService.openSchoolPeriod.id)
      .subscribe(response => {
        this.partnerEvaluation = response;
      });
  }

  buildColumns() {
    this.columns = [
      {field: 'name', header: 'Pregunta'},
    ];
  }

  redirectAutoEvaluationForm(autoEvaluation: AutoEvaluationModel) {
    this.router.navigate(['/core/teacher/teacher-evaluations/auto-evaluations',
      autoEvaluation.id], {queryParams: {evaluationTypeId: autoEvaluation.evaluationType?.id}}
    );
  }

  redirectPartnerEvaluationForm(partnerEvaluation: PartnerEvaluationModel) {
    this.router.navigate(['/core/teacher/teacher-evaluations/partner-evaluations',
      partnerEvaluation.id], {queryParams: {evaluationTypeId: partnerEvaluation.evaluationType?.id}}
    );
  }
}
