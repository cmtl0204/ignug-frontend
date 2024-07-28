import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AutoEvaluationModel, QuestionModel} from '@models/teacher-evaluation';
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

  create(payload: AutoEvaluationModel[]): Observable<QuestionModel> {
    const url = `${this.API_URL}`;

    return this.httpClient.post<ServerResponse>(url, payload).pipe(
      map((response) => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  findAll(): Observable<QuestionModel[]> {
    const url = `${this.API_URL}/find/all`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  find(page: number = 0, search: string = ''): Observable<ServerResponse> {
    const url = `${this.API_URL}`;

    const headers = new HttpHeaders().append('pagination', 'true');
    const params = new HttpParams()
      .append('page', page)
      .append('search', search);

    return this.httpClient.get<ServerResponse>(url, {headers, params}).pipe(
      map((response) => {
        return response;
      })
    );
  }

  findPartnerEvaluationByEvaluated(evaluatedId: string): Observable<AutoEvaluationModel> {
    const url = `${this.API_URL}/evaluated/${evaluatedId}`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  findOne(id: string): Observable<QuestionModel> {
    const url = `${this.API_URL}/${id}`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  update(id: string, payload: QuestionModel): Observable<QuestionModel> {
    const url = `${this.API_URL}/${id}`;

    this.coreService.isProcessing = true;
    return this.httpClient.put<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  remove(id: string): Observable<QuestionModel> {
    const url = `${this.API_URL}/${id}`;

    this.coreService.isProcessing = true;
    return this.httpClient.delete<ServerResponse>(url).pipe(
      map((response) => {
        this.coreService.isProcessing = false;
        this.messageService.success(response);
        return response.data;
      })
    );
  }
}
