import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {EventModel} from "@models/core";
import {ServerResponse} from '@models/http-response';
import {CoreService, MessageService} from '@services/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardsHttpService {
  private readonly API_URL = `${environment.API_URL}/dashboards`;
  private readonly coreService = inject(CoreService);
  private readonly httpClient = inject(HttpClient);
  private readonly messageService = inject(MessageService);

  constructor() {
  }

  findEnrolledStudents(careerIds: string[], schoolPeriodId: string): Observable<any> {
    const url = `${this.API_URL}/enrolled-students`;

    let params = new HttpParams().append('schoolPeriodId', schoolPeriodId);

    if (careerIds) {
      params = params.append('careerIds', careerIds.toString());
    }
    return this.httpClient.get<ServerResponse>(url, {params}).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  findEnrolledStudentsForSex(careerIds: string[], schoolPeriodId: string): Observable<any> {
    const url = `${this.API_URL}/enrolled-students/sexes`;

    let params = new HttpParams().append('schoolPeriodId', schoolPeriodId);

    if (careerIds) {
      params = params.append('careerIds', careerIds.toString());
    }
    return this.httpClient.get<ServerResponse>(url, {params}).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  findEnrolledStudentsForEthnicOrigins(careerIds: string[], schoolPeriodId: string): Observable<any> {
    const url = `${this.API_URL}/enrolled-students/ethnic-origins`;

    let params = new HttpParams().append('schoolPeriodId', schoolPeriodId);

    if (careerIds) {
      params = params.append('careerIds', careerIds.toString());
    }
    return this.httpClient.get<ServerResponse>(url, {params}).pipe(
      map((response) => {
        return response.data;
      })
    );
  }
}
