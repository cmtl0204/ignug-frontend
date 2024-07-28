// import { Component, inject, OnInit } from '@angular/core';
// import { BreadcrumbService, CoreService, MessageService, QuestionsHttpService } from '@services/core';
// import { ColumnModel, QuestionModel } from '@models/core';
// import { MenuItem, PrimeIcons } from 'primeng/api';
// import { BreadcrumbEnum, IconButtonActionEnum, LabelButtonActionEnum } from '@utils/enums';
// import { ActivatedRoute, Router } from '@angular/router';
//
// @Component({
//   selector: 'app-question-list',
//   templateUrl: './question-list.component.html',
//   styleUrls: ['./question-list.component.scss'],
// })
// export class QuestionListComponent implements OnInit {
//   /** Services **/
//   private readonly questionsHttpService = inject(QuestionsHttpService);
//   private readonly breadcrumbService = inject(BreadcrumbService);
//   private readonly router = inject(Router);
//   private readonly route = inject(ActivatedRoute);
//   protected readonly messageService = inject(MessageService);
//   protected readonly coreService = inject(CoreService);
//
//   protected items: QuestionModel[] = [];
//   protected selectedItem!: QuestionModel;
//   protected buttonActions: MenuItem[] = [];
//   protected columns: ColumnModel[] = [];
//   protected isButtonActions = false;
//
//   private evaluationId!: string;
//
//   constructor() {
//     this.breadcrumbService.setItems([
//       { label: BreadcrumbEnum.TEACHER_EVALUATIONS },
//       { label: BreadcrumbEnum.QUESTIONS },
//     ]);
//
//     this.buildButtonActions();
//     this.buildColumns();
//   }
//
//   ngOnInit() {
//     this.route.paramMap.subscribe((params) => {
//       this.evaluationId = params.get('evaluationId') as string;
//       this.findAll();
//     });
//   }
//
//   findAll(): void {
//     if (this.evaluationId) {
//       this.questionsHttpService.findAll(this.evaluationId).subscribe((response) => {
//         console.log('Questions from service:', response); // Log the questions received
//         this.items = response;
//         console.log('Items assigned to items:', this.items); // Log the items assigned to items
//
//       });
//     }
//   }
//
//   buildColumns(): void {
//     this.columns = [
//       { field: 'code', header: 'Código' },
//       { field: 'description', header: 'Descripción' },
//       { field: 'name', header: 'Nombre' },
//       { field: 'type', header: 'Tipo' },
//     ];
//   }
//
//   buildButtonActions(): void {
//     this.buttonActions = [
//       {
//         label: LabelButtonActionEnum.UPDATE,
//         icon: IconButtonActionEnum.UPDATE,
//         command: () => {
//           if (this.selectedItem?.id) this.redirectEditForm(this.selectedItem.id);
//         },
//       },
//       {
//         label: LabelButtonActionEnum.DELETE,
//         icon: IconButtonActionEnum.DELETE,
//         command: () => {
//           if (this.selectedItem?.id) this.remove(this.selectedItem.id);
//         },
//       },
//     ];
//   }
//
//   redirectEditForm(id: string) {
//     this.router.navigate(['/core/coordinator-academic/teacher-evaluations/questions', id]);
//   }
//
//   remove(id: string) {
//     this.messageService.questionDelete().then((result) => {
//       if (result.isConfirmed) {
//         this.questionsHttpService.remove(id).subscribe(() => {
//           this.items = this.items.filter((item) => item.id !== id);
//         });
//       }
//     });
//   }
//
//   selectItem(item: QuestionModel) {
//     this.isButtonActions = true;
//     this.selectedItem = item;
//   }
//
//   trackByFn(index: number, item: any) {
//     return item.id;
//   }
//
//   protected readonly PrimeIcons = PrimeIcons;
// }
