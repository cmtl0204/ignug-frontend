import {Component, inject, Input, OnInit} from '@angular/core';
import {PrimeIcons} from "primeng/api";
import {QuestionsHttpService, ResultsHttpService} from "@services/teacher-evaluation";
import {QuestionModel, ResponseModel, ResultModel} from "@models/teacher-evaluation";
import {BreadcrumbService, CoreService, MessageDialogService, RoutesService} from "@services/core";
import {ColumnModel} from "@models/core";
import {BreadcrumbEnum} from "@shared/enums";

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrl: './evaluation-form.component.scss'
})
export class EvaluationFormComponent implements OnInit {
  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly resultsHttpService = inject(ResultsHttpService);
  private readonly questionsHttpService = inject(QuestionsHttpService);
  protected readonly coreService = inject(CoreService);
  protected readonly messageDialogService = inject(MessageDialogService);
  private readonly routesService = inject(RoutesService);

  protected columns: ColumnModel[] = [];
  @Input() id: string = '4f3bb443-3278-4e02-a674-31e39bf4bb6e';
  protected questions: QuestionModel[] = [];
  protected results: ResultModel[] = [];
  protected missingQuestions: string[] = [];

  protected readonly PrimeIcons = PrimeIcons;

  constructor() {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.EVALUATIONS, routerLink: [this.routesService.teacherEvaluationsAuto]},
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

    console.log(this.results);
    this.questions.forEach(question => {
      if (!this.results.find(result => result.questionId === question.id)) {
        console.log('entro');
        if (question?.name)
          this.missingQuestions.push(`${question.sort} ${question.name}`);
          // this.missingQuestions.push(question.sort.toString());
      }
    });

    this.missingQuestions.sort();
  }
}
