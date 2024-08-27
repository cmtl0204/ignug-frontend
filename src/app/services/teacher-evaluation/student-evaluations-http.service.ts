import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ServerResponse} from '@models/http-response';
import {CoreService, MessageService} from '@services/core';
import {StudentEvaluationModel} from "@models/teacher-evaluation";

@Injectable({
  providedIn: 'root'
})
export class StudentEvaluationsHttpService {
  private readonly API_URL = `${environment.API_URL}/teacher-evaluations/student-evaluations`;
  private readonly coreService = inject(CoreService);
  private readonly httpClient = inject(HttpClient);
  private readonly messageService = inject(MessageService);

  constructor() {
  }

  findStudentEvaluationsByEvaluator(evaluatorId: string, schoolPeriodId: string): Observable<StudentEvaluationModel[]> {
    const url = `${this.API_URL}/evaluators/${evaluatorId}`;

    const params = new HttpParams().append('schoolPeriodId', schoolPeriodId);

    return this.httpClient.get<ServerResponse>(url, {params}).pipe(
      map((response) => {
        return response.data;
      })
    );
  }
}
