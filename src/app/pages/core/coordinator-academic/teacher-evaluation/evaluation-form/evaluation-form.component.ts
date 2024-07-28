// import {Component, inject, Input, OnInit} from '@angular/core';
// import {PrimeIcons} from "primeng/api";
// import {AuthHttpService, AuthService} from "@services/auth";
// import {
//   BreadcrumbService,
//   CataloguesHttpService,
//   CoreService,
//   MessageDialogService,
//   RoutesService
// } from "@services/core";
// import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
// import {CatalogueModel} from "@models/core";
// import {BreadcrumbEnum, CatalogueTypeEnum, EvaluationFormEnum, RoutesEnum, SkeletonEnum} from "@utils/enums";
// import {OnExitInterface} from "@utils/interfaces";
// import {EvaluationsHttpService} from "@services/core/evaluations-http.service";
//
// @Component({
//   selector: 'app-evaluation-form',
//   templateUrl: './evaluation-form.component.html',
//   styleUrl: './evaluation-form.component.scss'
// })
// export class EvaluationFormComponent implements OnInit, OnExitInterface {
//   /** Services **/
//   protected readonly authService = inject(AuthService);
//   private readonly breadcrumbService = inject(BreadcrumbService);
//   private readonly evaluationsHttpService = inject(EvaluationsHttpService);
//   protected readonly cataloguesHttpService = inject(CataloguesHttpService);
//   protected readonly coreService = inject(CoreService);
//   private readonly formBuilder = inject(FormBuilder);
//   public readonly messageDialogService = inject(MessageDialogService);
//   private readonly routesService = inject(RoutesService);
//
//   /** Form **/
//   @Input({required: true}) id!: string;
//   protected form!: FormGroup;
//   private formErrors: string[] = [];
//
//   /** Foreign Keys **/
//   protected personTypes: CatalogueModel[] = [];
//
//   /** Enums **/
//   protected readonly EvaluationFormEnum = EvaluationFormEnum;
//   protected readonly SkeletonEnum = SkeletonEnum;
//   protected readonly PrimeIcons = PrimeIcons; //pending
//
//   constructor() {
//     this.breadcrumbService.setItems([
//       {label: BreadcrumbEnum.TEACHER_EVALUATIONS},
//       {label: BreadcrumbEnum.EVALUATIONS,routerLink:'/core/coordinator-academic/teacher-evaluations/evaluations'},
//       {label: BreadcrumbEnum.FORM},
//     ]);
//
//     this.buildForm();
//   }
//
//   async onExit() {
//     return true;
//     // return this.messageDialogService.questionOnExit();
//   }
//
//   ngOnInit(): void {
//     /** Load Foreign Keys**/
//     this.loadPersonTypes();
//
//     if (this.id !== RoutesEnum.NEW) {
//       this.findItem(this.id);
//     }
//   }
//
//   findItem(id: string) {
//     this.evaluationsHttpService.findOne(id).subscribe(evaluation => {
//       this.form.patchValue(evaluation);
//     });
//   }
//
//   /** Form Builder & Validates **/
//   buildForm() {
//     this.form = this.formBuilder.group({
//       code: [null, [Validators.required]],
//       name: [null, [Validators.required]],
//     });
//   }
//
//   validateForm(): boolean {
//     this.formErrors = [];
//
//     if (this.codeField.invalid) this.formErrors.push(EvaluationFormEnum.code);
//     if (this.nameField.invalid) this.formErrors.push(EvaluationFormEnum.name);
//
//     return this.form.valid && this.formErrors.length === 0;
//   }
//
//   /** Load Foreign Keys  **/
//   loadPersonTypes() {
//     // this.personTypes = this.cataloguesHttpService.findByType(CatalogueTypeEnum.COMPANIES_PERSON_TYPE);
//   }
//
//   /** Form Actions **/
//   onSubmit(): void {
//     if (this.validateForm()) {
//       this.update();
//     } else {
//       this.form.markAllAsTouched();
//       this.messageDialogService.fieldErrors(this.formErrors);
//     }
//   }
//
//   update(): void {
//     this.evaluationsHttpService.update(this.id,this.form.value).subscribe(evaluation=>{
//
//     });
//   }
//
//   /** Redirects **/
//   redirectRegistration() {
//     // this.messageDialogService.questionOnExit().subscribe(result => {
//     //   if (result) {
//     //     this.onLeave = true;
//     //     this.routesService.registration();
//     //   } else {
//     //     this.onLeave = false;
//     //   }
//     // });
//
//     // this.routesService.registration();
//   }
//
//   /** Getters Form**/
//   get codeField(): AbstractControl {
//     return this.form.controls['code'];
//   }
//
//   get nameField(): AbstractControl {
//     return this.form.controls['name'];
//   }
// }
