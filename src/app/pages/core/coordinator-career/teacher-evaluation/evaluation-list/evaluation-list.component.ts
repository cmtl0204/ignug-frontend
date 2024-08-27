import {Component, inject, Input, OnInit} from '@angular/core';
import {MenuItem, PrimeIcons} from "primeng/api";
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
import {BreadcrumbEnum, IconButtonActionEnum, LabelButtonActionEnum} from "@utils/enums";
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
  protected buttonActions: MenuItem[] = [];
  protected isButtonActions: boolean = false;
  protected selectedItem!: CoordinatorEvaluationModel;

  constructor() {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.TEACHER_EVALUATIONS},
    ]);
    this.buildColumns();
    this.buildButtonActions();
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
    ];
  }

  buildButtonActions() {
    this.buttonActions = [
      {
        label: LabelButtonActionEnum.EVALUATE,
        icon: IconButtonActionEnum.EVALUATE,
        command: () => {
          if (this.selectedItem?.id) this.redirectCoordinatorEvaluationForm(this.selectedItem);
        },
      }
    ];
  }

  redirectAutoEvaluationForm(autoEvaluation: AutoEvaluationModel) {
    this.router.navigate(['/core/teacher/teacher-evaluations/auto-evaluations',
      autoEvaluation.id], {queryParams: {evaluationTypeId: autoEvaluation.evaluationType?.id}}
    );
  }

  redirectCoordinatorEvaluationForm(coordinatorEvaluation: CoordinatorEvaluationModel) {
    this.router.navigate(['/core/coordinator-career/teacher-evaluations/coordinator-evaluations',
        coordinatorEvaluation.id],
      {queryParams: {evaluationTypeId: coordinatorEvaluation.evaluationType?.id}}
    );
  }

  selectItem(item: CoordinatorEvaluationModel) {
    this.isButtonActions = true;
    this.selectedItem = item;
  }

  protected readonly Math = Math;
}
