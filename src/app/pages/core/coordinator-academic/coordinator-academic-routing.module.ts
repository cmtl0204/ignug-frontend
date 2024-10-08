import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'teacher-evaluations',
    loadChildren: () => import('./teacher-evaluation/teacher-evaluation.module').then(m => m.TeacherEvaluationModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordinatorAcademicRoutingModule { }
