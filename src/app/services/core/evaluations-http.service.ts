import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {EvaluationModel} from '@models/core';
import {ServerResponse} from '@models/http-response';
import {CoreService, MessageService} from '@services/core';

@Injectable({
  providedIn: 'root'
})
export class EvaluationsHttpService {
  private readonly API_URL = `${environment.API_URL}/teacher-evaluations/evaluations`;
  private readonly coreService = inject(CoreService);
  private readonly httpClient = inject(HttpClient);
  private readonly messageService = inject(MessageService);

  constructor() {
  }

  create(payload: EvaluationModel): Observable<EvaluationModel> {
    const url = `${this.API_URL}`;

    return this.httpClient.post<ServerResponse>(url, payload).pipe(
      map((response) => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  findAll(): Observable<EvaluationModel[]> {
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

  findOne(id: string): Observable<EvaluationModel> {
    const url = `${this.API_URL}/${id}`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  update(id: string, payload: EvaluationModel): Observable<EvaluationModel> {
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

  reactivate(id: string): Observable<EvaluationModel> {
    const url = `${this.API_URL}/${id}/reactivate`;

    return this.httpClient.patch<ServerResponse>(url, null).pipe(
      map((response) => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }

  remove(id: string): Observable<EvaluationModel> {
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

  hide(id: string): Observable<EvaluationModel> {
    const url = `${this.API_URL}/${id}/hide`;

    return this.httpClient.patch<ServerResponse>(url, null).pipe(
      map((response) => {
        this.messageService.success(response);
        return response.data;
      })
    );
  }
}
