import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AutoEvaluationModel, PartnerEvaluationModel} from '@models/teacher-evaluation';
import {ServerResponse} from '@models/http-response';
import {CoreService, MessageService} from '@services/core';

@Injectable({
  providedIn: 'root'
})
export class PartnerEvaluationsHttpService {
  private readonly API_URL = `${environment.API_URL}/teacher-evaluations/partner-evaluations`;
  private readonly coreService = inject(CoreService);
  private readonly httpClient = inject(HttpClient);
  private readonly messageService = inject(MessageService);

  constructor() {
  }

  findPartnerEvaluationsByEvaluator(evaluatorId: string, schoolPeriodId: string): Observable<PartnerEvaluationModel[]> {
    const url = `${this.API_URL}/evaluators/${evaluatorId}`;

    const params = new HttpParams().append('schoolPeriodId', schoolPeriodId);

    return this.httpClient.get<ServerResponse>(url, {params}).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  findPartnerEvaluationByEvaluated(evaluatedId: string, schoolPeriodId: string): Observable<PartnerEvaluationModel> {
    const url = `${this.API_URL}/evaluated/${evaluatedId}`;

    const params = new HttpParams().append('schoolPeriodId', schoolPeriodId);

    return this.httpClient.get<ServerResponse>(url, {params}).pipe(
      map((response) => {
        return response.data;
      })
    );
  }
}
