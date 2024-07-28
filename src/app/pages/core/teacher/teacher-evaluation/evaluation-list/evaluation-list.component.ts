import {Component, inject, Input, OnInit} from '@angular/core';
import {PrimeIcons} from "primeng/api";
import {
  BreadcrumbService,
  CoreService,
  EvaluationsHttpService,
  MessageDialogService,
  RoutesService
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
  ResultModel
} from "@models/teacher-evaluation";
import {BreadcrumbEnum} from "@shared/enums";
import {AuthService} from "@services/auth";

@Component({
  selector: 'app-evaluation-list',
  templateUrl: './evaluation-list.component.html',
  styleUrl: './evaluation-list.component.scss'
})
export class EvaluationListComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly resultsHttpService = inject(ResultsHttpService);
  private readonly autoEvaluationsHttpService = inject(AutoEvaluationsHttpService);
  private readonly partnerEvaluationsHttpService = inject(PartnerEvaluationsHttpService);
  protected readonly coreService = inject(CoreService);
  protected readonly messageDialogService = inject(MessageDialogService);
  private readonly routesService = inject(RoutesService);

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
    this.autoEvaluationsHttpService.findAutoEvaluationByEvaluated(this.authService.auth.id).subscribe(response => {
      this.autoEvaluation = response;
    });
  }

  findPartnerEvaluationByEvaluated() {
    this.partnerEvaluationsHttpService.findPartnerEvaluationByEvaluated(this.authService.auth.id).subscribe(response => {
      this.partnerEvaluation = response;
    });
  }

  buildColumns() {
    this.columns = [
      {field: 'name', header: 'Pregunta'},
    ];
  }

  onSubmit() {

  }
}
