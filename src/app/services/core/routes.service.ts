import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

export enum AppRoutesEnum {
  CORE = '/core',
  AUTH = '/auth',
  COMMON = '/common',
}

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(private router: Router) {
  }

  get core(): string {
    return '/core';
  }

  /** Admin Role **/
  /** Teacher Role **/
  /** Student Role **/
  /** Coordinator Administrative Role **/
  /** Rector Role**/
  /** Welfare Role **/
  get admin(): string {
    return '/admin/';
  }

  get users(): string {
    return this.admin + 'users';
  }

  /** Coordinator Career Role **/
  get institutions(): string {
    return this.core + '/coordinator-career/institutions';
  }

  get careers(): string {
    return this.core + '/coordinator-career/careers';
  }

  get curriculums(): string {
    return this.core + '/coordinator-career/curriculums';
  }

  get subjects(): string {
    return this.core + '/coordinator-career/subjects';
  }

  get schoolPeriods(): string {
    return this.core + '/coordinator-career/school-periods';
  }

  /** Secretary Role **/
  get enrollments(): string
  {
    return this.core + '/secretary/enrollments';
  }

  enrollmentsDetailList(enrollmentId: string): string {
    return this.core + `/secretary/enrollments/${enrollmentId}/enrollment-details`;
  }

  enrollmentsDetailForm(enrollmentId: string): string {
    return this.core + `/secretary/enrollments/${enrollmentId}/enrollment-details`;
  }

  /** Reviewer Role **/
  get inscriptions(): string {
    return this.core + '/reviewer/inscriptions';
  }

  inscriptionsDetailList(enrollmentId: string): string {
    return this.core + `/reviewer/inscriptions/${enrollmentId}/inscription-details`;
  }

  inscriptionsDetailForm(enrollmentId: string): string {
    return this.core + `/reviewer/inscriptions/${enrollmentId}/inscription-details`;
  }

  get events(): string {
    return this.core + '/events';
  }

  get studentsCoordinatorCareer(): string {
    return this.core + '/coordinator-career/students';
  }

  get parallelCapacity(): string {
    return this.core + '/careers/parallel-capacity';
  }

  get teachersCoordinatorCareer(): string {
    return this.core + '/coordinator-career/teachers';
  }

  get teacherDistributions(): string {
    return this.core + '/teacher/teacher-distributions';
  }

  get teacherDistributionsGrades(): string {
    return this.core + '/teacher/teacher-distributions/grades';
  }

  get teacherEvaluations(): string {
    return this.core + '/teacher/teacher-evaluations';
  }

  get teacherEvaluationsAuto(): string {
    return this.core + '/teacher/teacher-evaluations/auto';
  }

  get common(): string {
    return '/common';
  }

  /** Login **/
  login() {
    this.router.navigateByUrl(`/login`);
  }

  institutionSelect() {
    this.router.navigateByUrl(`/auth/authentication/institution-select`);
  }

  roleSelect() {
    this.router.navigateByUrl(`/auth/authentication/role-select`);
  }

  get profile() {
    return '/profile';
  }

  /** Dashboards **/
  dashboardAdmin() {
    // this.router.navigateByUrl(`/core/dashboards/admin`);
    this.router.navigateByUrl(`/admin/users`);
  }

  dashboardRector() {
    this.router.navigateByUrl(`/core/dashboards/rector`);
  }

  dashboardTeacher() {
    this.router.navigateByUrl(`/core/dashboards/teacher`);
  }

  dashboardStudent() {
    this.router.navigateByUrl(`/core/dashboards/student`);
  }

  dashboardCoordinatorAdministrative() {
    this.router.navigateByUrl(`/core/dashboards/coordinator-administrative`);
  }

  dashboardCoordinatorCareer() {
    this.router.navigateByUrl(`/core/dashboards/coordinator-career`);
  }

  dashboardReviewer() {
    this.router.navigateByUrl(`/core/reviewer/inscriptions`);
  }

  dashboardSecretary() {
    this.router.navigateByUrl(`/core/secretary/enrollments`);
  }

  dashboardWelfare() {
    this.router.navigateByUrl(`/core/welfare/enrollments`);
  }

  dashboardCoordinatorAcademic() {
    this.router.navigateByUrl(`/core/dashboards/coordinator-academic`);
  }

  passwordReset() {
    this.router.navigateByUrl(`/password-reset`);
  }
}
