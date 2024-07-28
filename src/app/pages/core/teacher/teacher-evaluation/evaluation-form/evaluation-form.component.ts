import {Component, inject, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PrimeIcons} from "primeng/api";
import {ColumnModel} from "@models/core";
import {QuestionModel, ResponseModel, ResultModel} from "@models/teacher-evaluation";
import {BreadcrumbService, CoreService, MessageDialogService, RoutesService} from "@services/core";
import {QuestionsHttpService, ResultsHttpService} from "@services/teacher-evaluation";
import {BreadcrumbEnum} from "@shared/enums";

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrl: './evaluation-form.component.scss'
})
export class EvaluationFormComponent implements OnInit {
  private readonly breadcrumbService = inject(BreadcrumbService);
  protected readonly coreService = inject(CoreService);
  private readonly questionsHttpService = inject(QuestionsHttpService);
  protected readonly messageDialogService = inject(MessageDialogService);
  private readonly resultsHttpService = inject(ResultsHttpService);
  private readonly routesService = inject(RoutesService);
  private readonly router = inject(Router);

  @Input() id: string = '';
  protected columns: ColumnModel[] = [];
  protected questions: QuestionModel[] = [];
  protected results: ResultModel[] = [];
  protected missingQuestions: string[] = [];

  protected readonly PrimeIcons = PrimeIcons;

  constructor() {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.TEACHER_EVALUATIONS, routerLink: [this.routesService.teacherEvaluations]},
      {label: BreadcrumbEnum.AUTO_EVALUATION}
    ]);
    this.buildColumns();
  }

  ngOnInit(): void {
    this.findQuestionsByEvaluationType();
  }

  findQuestionsByEvaluationType() {
    this.questionsHttpService.findQuestionsByEvaluationType(this.id).subscribe(questions => {
      this.questions = questions;
      // this.questions.forEach(question => {
      //   this.reply(question.id!, question.responses[0]);
      // })
    });
  }

  buildColumns() {
    this.columns = [
      {field: 'name', header: 'Pregunta'},
    ];
  }

  reply(questionId: string, response: ResponseModel) {
    const index = this.results.findIndex(result => result.questionId === questionId);

    if (index === -1) {
      this.results.push({
        modelId: this.id,
        questionId,
        responseId: response.id,
        score: response.score,
      });
    } else {
      this.results[index].responseId = response.id;
      this.results[index].score = response.score;
    }
  }

  onSubmit() {
    this.validateResults();

    if (this.results.length === this.questions.length) {
      this.resultsHttpService.createAutoEvaluation(this.results).subscribe(response => {
        this.router.navigate([this.routesService.teacherEvaluations]);
      });
    } else {
      this.messageDialogService.errorCustom(
        'Debe responder todas las preguntas',
        [
          `Preguntas respondidas ${this.results.length} de ${this.questions.length}`,
          ...this.missingQuestions
        ],false);
    }
  }

  validateResults() {
    this.missingQuestions = [];

    this.questions.forEach(question => {
      if (!this.results.find(result => result.questionId === question.id)) {
        if (question?.name)
          this.missingQuestions.push(`${question.sort} ${question.name}`);
      }
    });

    this.missingQuestions.sort();
  }
}
