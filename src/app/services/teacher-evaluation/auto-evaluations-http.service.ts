import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AutoEvaluationModel} from '@models/teacher-evaluation';
import {ServerResponse} from '@models/http-response';
import {CoreService, MessageService} from '@services/core';

@Injectable({
  providedIn: 'root'
})
export class AutoEvaluationsHttpService {
  private readonly API_URL = `${environment.API_URL}/teacher-evaluations/auto-evaluations`;
  private readonly coreService = inject(CoreService);
  private readonly httpClient = inject(HttpClient);
  private readonly messageService = inject(MessageService);

  constructor() {
  }

  findAutoEvaluationByEvaluated(evaluatedId: string, schoolPeriodId: string): Observable<AutoEvaluationModel> {
    const url = `${this.API_URL}/evaluated/${evaluatedId}`;

    const params = new HttpParams().append('schoolPeriodId', schoolPeriodId);

    return this.httpClient.get<ServerResponse>(url, {params}).pipe(
      map((response) => {
        return response.data;
      })
    );
  }
}
