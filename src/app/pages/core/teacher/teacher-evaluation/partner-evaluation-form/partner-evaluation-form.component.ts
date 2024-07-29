import {Component, inject, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PrimeIcons} from "primeng/api";
import {ColumnModel} from "@models/core";
import {QuestionModel, ResponseModel, ResultModel} from "@models/teacher-evaluation";
import {BreadcrumbService, CoreService, MessageDialogService, RoutesService} from "@services/core";
import {QuestionsHttpService, ResultsHttpService} from "@services/teacher-evaluation";
import {BreadcrumbEnum} from "@utils/enums";

@Component({
  selector: 'app-partner-evaluation-form',
  templateUrl: './partner-evaluation-form.component.html',
  styleUrl: './partner-evaluation-form.component.scss'
})
export class PartnerEvaluationFormComponent implements OnInit{
  private readonly breadcrumbService = inject(BreadcrumbService);
  protected readonly coreService = inject(CoreService);
  private readonly resultsHttpService = inject(ResultsHttpService);
  private readonly routesService = inject(RoutesService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  @Input() id: string = '';
  protected evaluationTypeId: string = '';

  constructor() {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.TEACHER_EVALUATIONS, routerLink: [this.routesService.teacherEvaluations]},
      {label: BreadcrumbEnum.AUTO_EVALUATION}
    ]);
  }

  ngOnInit() {
    this.evaluationTypeId = this.activatedRoute.snapshot.params['evaluationTypeId'];
  }

  save(results:ResultModel[]) {
    this.resultsHttpService.createPartnerEvaluation(this.id,results).subscribe(response => {
      this.router.navigate([this.routesService.teacherEvaluations]);
    });
  }
}
