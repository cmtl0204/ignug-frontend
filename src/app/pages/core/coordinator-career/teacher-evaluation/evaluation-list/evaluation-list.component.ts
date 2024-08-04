import {Component, inject, Input, OnInit} from '@angular/core';
import {PrimeIcons} from "primeng/api";
import {
  BreadcrumbService,
  CoreService,
  SchoolPeriodsService
} from "@services/core";
import {
  AutoEvaluationsHttpService,
  CoordinatorEvaluationsHttpService,
  PartnerEvaluationsHttpService,
} from "@services/teacher-evaluation";
import {ColumnModel} from "@models/core";
import {
  AutoEvaluationModel, CoordinatorEvaluationModel,
  PartnerEvaluationModel,
  ResultModel
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
  private readonly coordinatorEvaluationsHttpService = inject(CoordinatorEvaluationsHttpService);
  protected readonly coreService = inject(CoreService);
  private readonly router = inject(Router);

  protected columns: ColumnModel[] = [];
  @Input() id: string = '';
  protected coordinatorEvaluations!: CoordinatorEvaluationModel[];
  protected results: ResultModel[] = [];

  protected readonly PrimeIcons = PrimeIcons;

  constructor() {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.TEACHER_EVALUATIONS},
    ]);
    this.buildColumns();
  }

  ngOnInit(): void {
    this.findCoordinatorEvaluationsByEvaluator();
  }

  findCoordinatorEvaluationsByEvaluator() {
    this.coordinatorEvaluationsHttpService.findCoordinatorEvaluationsByEvaluator(
      this.authService.auth.id,
      this.schoolPeriodsService.openSchoolPeriod.id)
      .subscribe(response => {
        this.coordinatorEvaluations = response;
      });
  }

  buildColumns() {
    this.columns = [
      {field: 'evaluated', header: 'Evaluado'},
      {field: 'totalScore', header: 'Puntuación'},
      {field: 'enabled', header: 'Habilitado'},
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

  selectItem(item:CoordinatorEvaluationModel){

  }
  protected readonly Math = Math;
}
