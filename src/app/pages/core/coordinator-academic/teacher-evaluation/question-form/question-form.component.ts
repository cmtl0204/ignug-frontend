import {Component, inject, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PrimeIcons} from "primeng/api";
import {CatalogueModel} from '@models/core';
import {
  BreadcrumbService,
  CataloguesHttpService,
  CoreService,
  MessageDialogService,
  RoutesService
} from "@services/core";

import {
  QuestionsHttpService
} from "@services/teacher-evaluation";

import {BreadcrumbEnum, CatalogueTypeEnum, QuestionFormEnum, RoutesEnum, SkeletonEnum} from "@shared/enums";

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {
  /** Services **/
  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly questionsHttpService = inject(QuestionsHttpService);
  protected readonly cataloguesHttpService = inject(CataloguesHttpService);
  protected readonly coreService = inject(CoreService);
  private readonly formBuilder = inject(FormBuilder);
  public readonly messageDialogService = inject(MessageDialogService);
  private readonly routesService = inject(RoutesService);

  /** Form **/
  @Input({required: true}) id!: string;
  protected form!: FormGroup;
  private formErrors: string[] = [];

  /** Foreign Keys **/
  protected evaluationTypes: CatalogueModel[] = [];
  protected types: CatalogueModel[] = [];

  /** Enums **/
  protected readonly QuestionFormEnum = QuestionFormEnum;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly PrimeIcons = PrimeIcons; //pending

  constructor() {
    this.buildForm();
  }

  ngOnInit() {
    this.loadEvaluationTypes();
    this.loadTypes();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      code: [null, Validators.required],
      description: [null, Validators.required],
      enabled: [true, Validators.required],
      name: [null, Validators.required],
      type: [null, Validators.required],
      evaluationType: [null, Validators.required]
    });
  }

  loadEvaluationTypes() {
    this.evaluationTypes = this.cataloguesHttpService.findByType(CatalogueTypeEnum.QUESTIONS_EVALUATION_TYPE);
  }

  loadTypes() {
    this.types = this.cataloguesHttpService.findByType(CatalogueTypeEnum.QUESTIONS_TYPE);
  }

  redirectRegistration() {
  }

  onSubmit() {
    if (this.validateForm()) {
      if (this.id === RoutesEnum.NEW) {
        this.create();
      } else {
        this.update();
      }
    } else {
      this.form.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  validateForm(): boolean {
    this.formErrors = [];

    if (this.codeField.invalid) this.formErrors.push(QuestionFormEnum.code);
    if (this.descriptionField.invalid) this.formErrors.push(QuestionFormEnum.description);
    if (this.enabledField.invalid) this.formErrors.push(QuestionFormEnum.enabled);
    if (this.nameField.invalid) this.formErrors.push(QuestionFormEnum.name);
    if (this.typeField.invalid) this.formErrors.push(QuestionFormEnum.type);
    if (this.evaluationTypeField.invalid) this.formErrors.push(QuestionFormEnum.evaluationType);
    return this.form.valid && this.formErrors.length === 0;
  }

  create() {
    this.questionsHttpService.create(this.form.value).subscribe(
      response => {
        console.log('Question created successfully!', response);
        // Añadir manejo de respuestas exitosas
      },
      error => {
        console.error('Error creating question:', error);
        // Añadir manejo de errores
      }
    );
  }

  update() {
    this.questionsHttpService.create(this.form.value).subscribe(
      response => {
        console.log('Question created successfully!', response);
        // Añadir manejo de respuestas exitosas
      },
      error => {
        console.error('Error creating question:', error);
        // Añadir manejo de errores
      }
    );
  }

  /** Getters Form**/
  get codeField(): AbstractControl {
    return this.form.controls['code'];
  }

  get descriptionField(): AbstractControl {
    return this.form.controls['description'];
  }

  get enabledField(): AbstractControl {
    return this.form.controls['enabled'];
  }

  get nameField(): AbstractControl {
    return this.form.controls['name'];
  }

  get typeField(): AbstractControl {
    return this.form.controls['type'];
  }

  get evaluationTypeField(): AbstractControl {
    return this.form.controls['evaluationType'];
  }

}
