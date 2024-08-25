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
  AutoEvaluationsHttpService, CoordinatorEvaluationsHttpService,
  PartnerEvaluationsHttpService,
  QuestionsHttpService,
  ResultsHttpService
} from "@services/teacher-evaluation";
import {ColumnModel} from "@models/core";
import {
  AutoEvaluationModel, CoordinatorEvaluationModel,
  PartnerEvaluationModel,
  QuestionModel,
  ResponseModel,
  ResultModel, StudentEvaluationModel
} from "@models/teacher-evaluation";
import {BreadcrumbEnum, IconButtonActionEnum, LabelButtonActionEnum, SeverityButtonActionEnum} from "@utils/enums";
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
  private readonly coordinatorEvaluationsHttpService = inject(CoordinatorEvaluationsHttpService);
  private readonly resultsHttpService = inject(ResultsHttpService);
  protected readonly coreService = inject(CoreService);
  private readonly router = inject(Router);
  data: any;

  options: any;

  protected columns: ColumnModel[] = [];
  @Input() id: string = '';
  protected autoEvaluation!: AutoEvaluationModel;
  protected partnerEvaluationEvaluator!: PartnerEvaluationModel;
  protected partnerEvaluationEvaluated!: PartnerEvaluationModel;
  protected coordinatorEvaluation!: CoordinatorEvaluationModel;
  protected integralEvaluation!: any;

  protected readonly PrimeIcons = PrimeIcons;

  constructor() {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.TEACHER_EVALUATIONS},
    ]);
    this.buildColumns();
  }

  ngOnInit(): void {
    this.findAutoEvaluationByEvaluated();
    this.findPartnerEvaluationByEvaluator();
    this.findPartnerEvaluationByEvaluated();
    this.findCoordinatorEvaluationByEvaluated();
    this.findIntegralEvaluationByEvaluated();
  }

  drawResults() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    const autoEvaluationScore = this.integralEvaluation.autoEvaluationScore * 100 / 10;
    const studentEvaluationScore = this.integralEvaluation.studentEvaluationScore * 100 / 40;
    const partnerEvaluationScore = this.integralEvaluation.partnerEvaluationScore * 100 / 25;
    const coordinatorEvaluationScore = this.integralEvaluation.coordinatorEvaluationScore * 100 / 25;
    this.data = {
      labels: ['Resultados'],
      datasets: [
        {
          label: 'Autoevaluación',
          data: [
            autoEvaluationScore,
          ],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
          ],
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          borderWidth: 1,
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-200'),
          ]
        },
        {
          label: 'Heteroevaluación',
          data: [
            studentEvaluationScore,
          ],
          backgroundColor: [
            documentStyle.getPropertyValue('--yellow-500'),
          ],
          borderColor: documentStyle.getPropertyValue('--yellow-500'),
          borderWidth: 1,
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--yellow-200'),
          ]
        },
        {
          label: 'Coevaluación por Pares',
          data: [
            partnerEvaluationScore,
          ],
          backgroundColor: [
            documentStyle.getPropertyValue('--purple-500'),
          ],
          borderColor: documentStyle.getPropertyValue('--purple-500'),
          borderWidth: 1,
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--purple-200'),
          ]
        },
        {
          label: 'Coevaluación por Autoridades',
          data: [
            coordinatorEvaluationScore,
          ],
          backgroundColor: [
            documentStyle.getPropertyValue('--green-500'),
          ],
          borderColor: documentStyle.getPropertyValue('--green-500'),
          borderWidth: 1,
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--green-200'),
          ]
        }
      ]
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          },
          backgroundColor: 'red'
        }
      }
    };
  }

  findAutoEvaluationByEvaluated() {
    this.autoEvaluationsHttpService.findAutoEvaluationByEvaluated(
      this.authService.auth.id,
      this.schoolPeriodsService.openSchoolPeriod.id)
      .subscribe(response => {
        this.autoEvaluation = response;
      });
  }

  findPartnerEvaluationByEvaluator() {
    this.partnerEvaluationsHttpService.findPartnerEvaluationByEvaluator(
      this.authService.auth.id,
      this.schoolPeriodsService.openSchoolPeriod.id)
      .subscribe(response => {
        this.partnerEvaluationEvaluator = response;
      });
  }

  findPartnerEvaluationByEvaluated() {
    this.partnerEvaluationsHttpService.findPartnerEvaluationByEvaluated(
      this.authService.auth.id,
      this.schoolPeriodsService.openSchoolPeriod.id)
      .subscribe(response => {
        this.partnerEvaluationEvaluated = response;
      });
  }

  findCoordinatorEvaluationByEvaluated() {
    this.coordinatorEvaluationsHttpService.findCoordinatorEvaluationByEvaluated(
      this.authService.auth.id,
      this.schoolPeriodsService.openSchoolPeriod.id)
      .subscribe(response => {
        this.coordinatorEvaluation = response;
      });
  }

  findIntegralEvaluationByEvaluated() {
    this.resultsHttpService.findIntegralEvaluationByEvaluated(
      this.authService.auth.id,
      this.schoolPeriodsService.openSchoolPeriod.id)
      .subscribe(response => {
        this.integralEvaluation = response;

        if (response.totalScore) this.drawResults();
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

  downloadIntegralEvaluation() {
    this.resultsHttpService.downloadIntegralEvaluation(this.authService.auth, this.schoolPeriodsService.openSchoolPeriod);
  }

  protected readonly Math = Math;
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;
}
