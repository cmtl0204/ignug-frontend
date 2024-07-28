// import {Component, inject, OnInit} from '@angular/core';
// import {BreadcrumbService, CoreService, EvaluationsHttpService, MessageService} from "@services/core";
// import {ColumnModel, EvaluationModel} from "@models/core";
// import {MenuItem, PrimeIcons} from "primeng/api";
// import {BreadcrumbEnum, IconButtonActionEnum, LabelButtonActionEnum} from "@utils/enums";
// import {Router} from "@angular/router";
//
// @Component({
//   selector: 'app-evaluation-list',
//   templateUrl: './evaluation-list.component.html',
//   styleUrl: './evaluation-list.component.scss'
// })
// export class EvaluationListComponent implements OnInit {
//   /** Services **/
//   private readonly evaluationsHttpService = inject(EvaluationsHttpService);
//   private readonly breadcrumbService = inject(BreadcrumbService);
//   private readonly router = inject(Router);
//   protected readonly messageService = inject(MessageService);
//   protected readonly coreService= inject(CoreService);
//
//   protected items: EvaluationModel[] = [];
//   protected selectedItem!: EvaluationModel;
//
//   protected buttonActions: MenuItem[] = [];
//   protected columns: ColumnModel[] = [];
//   protected isButtonActions: boolean = false;
//
//   constructor() {
//     this.breadcrumbService.setItems([
//       {label: BreadcrumbEnum.TEACHER_EVALUATIONS},
//       {label: BreadcrumbEnum.EVALUATIONS},
//     ]);
//
//     this.buildButtonActions();
//     this.buildColumns();
//   }
//
//   ngOnInit() {
//     this.findAll();
//   }
//
//   findAll() {
//     this.evaluationsHttpService.findAll()
//       .subscribe((response) => {
//         this.items = response;
//       });
//   }
//
//   buildColumns(): void {
//     this.columns = [
//       {field: 'name', header: 'Evaluación'}
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
//       }
//     ];
//   }
//
//   redirectEditForm(id: string) {
//     this.router.navigate(['/core/coordinator-academic/teacher-evaluations/evaluations', id]);
//   }
//
//   remove(id: string) {
//     this.messageService.questionDelete()
//       .then((result) => {
//         if (result.isConfirmed) {
//           this.evaluationsHttpService.remove(id).subscribe((user) => {
//             this.items = this.items.filter(item => item.id !== user.id);
//           });
//         }
//       });
//   }
//
//   selectItem(item: EvaluationModel) {
//     this.isButtonActions = true;
//     this.selectedItem = item;
//   }
//
//   protected readonly PrimeIcons = PrimeIcons;
// }
