import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {
  CreateStudentDto,
  EnrollmentDetailModel,
  EnrollmentModel,
  FileModel, SchoolPeriodModel,
  StudentModel,
  UpdateStudentDto
} from '@models/core';
import {ServerResponse} from '@models/http-response';
import {CareersService, CoreService, MessageService} from '@services/core';
import {format} from "date-fns";

@Injectable({
  providedIn: 'root'
})
export class StudentsHttpService {
  API_URL = `${environment.API_URL}/students`;
  protected readonly careersService = inject(CareersService);

  constructor(
    private coreService: CoreService,
    private httpClient: HttpClient,
    private messageService: MessageService,
  ) {
  }

  create(payload: CreateStudentDto): Observable<StudentModel> {
    const url = `${this.API_URL}`;

    this.coreService.isProcessing = true;
    return this.httpClient.post<ServerResponse>(url, payload).pipe(
      map((response) => {
        this.coreService.isProcessing = false;
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  findAll(page: number = 0, search: string = ''): Observable<ServerResponse> {
    const url = this.API_URL;

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

  findOne(id: string): Observable<StudentModel> {
    const url = `${this.API_URL}/${id}`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {
        return response.data;
      })
    );
  }

  update(id: string, payload: UpdateStudentDto): Observable<StudentModel> {
    const url = `${this.API_URL}/${id}`;

    this.coreService.isProcessing = true;
    return this.httpClient.put<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  updatePersonalInformation(id: string, payload: UpdateStudentDto): Observable<StudentModel> {
    const url = `${this.API_URL}/${id}/personal-information`;

    this.coreService.isProcessing = true;
    return this.httpClient.patch<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  updateOriginPlace(id: string, payload: UpdateStudentDto): Observable<StudentModel> {
    const url = `${this.API_URL}/${id}/origin-place`;

    this.coreService.isProcessing = true;
    return this.httpClient.patch<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  updateResidencePlace(id: string, payload: UpdateStudentDto): Observable<StudentModel> {
    const url = `${this.API_URL}/${id}/residence-place`;

    this.coreService.isProcessing = true;
    return this.httpClient.patch<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  updateCroquis(id: string, payload: UpdateStudentDto): Observable<StudentModel> {
    const url = `${this.API_URL}/${id}/croquis`;

    this.coreService.isProcessing = true;
    return this.httpClient.patch<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  updateFamilyEconomic(id: string, payload: UpdateStudentDto): Observable<StudentModel> {
    const url = `${this.API_URL}/${id}/family-economic`;

    this.coreService.isProcessing = true;
    return this.httpClient.patch<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  updateFamilyGroup(id: string, payload: UpdateStudentDto): Observable<StudentModel> {
    const url = `${this.API_URL}/${id}/family-group`;

    this.coreService.isProcessing = true;
    return this.httpClient.patch<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  updateFamilyHealth(id: string, payload: UpdateStudentDto): Observable<StudentModel> {
    const url = `${this.API_URL}/${id}/family-health`;

    this.coreService.isProcessing = true;
    return this.httpClient.patch<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  updateMigrationCountry(id: string, payload: UpdateStudentDto): Observable<StudentModel> {
    const url = `${this.API_URL}/${id}/migration-country`;

    this.coreService.isProcessing = true;
    return this.httpClient.patch<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  updateAcademicData(id: string, payload: UpdateStudentDto): Observable<StudentModel> {
    const url = `${this.API_URL}/${id}/academic-data`;

    this.coreService.isProcessing = true;
    return this.httpClient.patch<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  updateAdittionalEconomicData(id: string, payload: UpdateStudentDto): Observable<StudentModel> {
    const url = `${this.API_URL}/${id}/other-academic-data`;

    this.coreService.isProcessing = true;
    return this.httpClient.patch<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  updateHousingData(id: string, payload: UpdateStudentDto): Observable<StudentModel> {
    const url = `${this.API_URL}/${id}/housing-data`;

    this.coreService.isProcessing = true;
    return this.httpClient.patch<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  updatePsychosocialSection(id: string, payload: UpdateStudentDto): Observable<StudentModel> {
    const url = `${this.API_URL}/${id}/psychosocial-section`;

    this.coreService.isProcessing = true;
    return this.httpClient.patch<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  reactivate(id: string): Observable<StudentModel> {
    const url = `${this.API_URL}/${id}/reactivate`;

    return this.httpClient.put<ServerResponse>(url, null).pipe(
      map((response) => {
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  remove(id: string): Observable<StudentModel> {
    const url = `${this.API_URL}/${id}`;

    return this.httpClient.delete<ServerResponse>(url).pipe(
      map((response) => {
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  removeAll(users: StudentModel[]): Observable<StudentModel[]> {
    const url = `${this.API_URL}/remove-all`;

    return this.httpClient.patch<ServerResponse>(url, users).pipe(
      map((response) => {
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  hide(id: string): Observable<StudentModel> {
    const url = `${this.API_URL}/${id}/hide`;

    return this.httpClient.patch<ServerResponse>(url, null).pipe(
      map((response) => {
        this.messageService.success(response).then();
        return response.data;
      })
    );
  }

  findEnrollmentDetailsByStudent(studentId: string): Observable<EnrollmentDetailModel[]> {
    const url = `${this.API_URL}/${studentId}/enrollment-details`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  findLastEnrollmentDetailByStudent(studentId: string, careerId: string): Observable<string> {
    const url = `${this.API_URL}/${studentId}/last-enrollment-detail`;
    const params = new HttpParams().append('careerId', careerId)

    return this.httpClient.get<ServerResponse>(url, {params}).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  findEnrollmentSubjectsByStudent(studentId: string, schoolPeriodId: string, careerId: string): Observable<EnrollmentDetailModel[]> {
    const url = `${this.API_URL}/${studentId}/enrollment-subjects`;

    const params = new HttpParams()
      .append('schoolPeriodId', schoolPeriodId)
      .append('careerId', careerId);

    return this.httpClient.get<ServerResponse>(url, {params}).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  findEnrollmentByStudent(studentId: string): Observable<EnrollmentModel> {
    const url = `${this.API_URL}/${studentId}/enrollments`;

    const params = new HttpParams().append('careerId', this.careersService.career.id);

    return this.httpClient.get<ServerResponse>(url, {params}).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  generateSocioeconomicForm(id: string): Observable<any> {
    const url = `${environment.API_URL}/student-reports/${id}/socioeconomic-form`;

    this.coreService.isProcessing = true;

    return this.httpClient.get<BlobPart>(url, {responseType: 'blob' as 'json'}).pipe(
      map((response) => {
        this.coreService.isProcessing = false;
        return response;
      })
    );
  }

  generateStudentCard(id: string, careerId: string, schoolPeriodId: string): Observable<any> {
    const url = `${environment.API_URL}/student-reports/${id}/student-card`;

    const params = new HttpParams()
      .append('careerId', careerId)
      .append('schoolPeriodId', schoolPeriodId);

    this.coreService.isProcessing = true;

    return this.httpClient.get<BlobPart>(url, {params, responseType: 'blob' as 'json'}).pipe(
      map((response) => {
        this.coreService.isProcessing = false;
        return response;
      })
    );
  }

  downloadSocioeconomicForm(id: string) {
    const url = `${environment.API_URL}/student-reports/${id}/socioeconomic-form`;

    this.coreService.isProcessing = true;
    this.httpClient.get<BlobPart>(url, {responseType: 'blob' as 'json'})
      .subscribe(response => {
        // const filePath = URL.createObjectURL(new Blob(binaryData, {type: file.extension}));
        const filePath = URL.createObjectURL(new Blob([response]));
        const downloadLink = document.createElement('a');
        downloadLink.href = filePath;
        downloadLink.setAttribute('download', 'ficha_socioeconomica.pdf');
        document.body.appendChild(downloadLink);
        downloadLink.click();
        this.coreService.isProcessing = false;
      });
  }

  downloadSocioeconomicFormsBySchoolPeriod(schoolPeriod: SchoolPeriodModel) {
    const url = `${environment.API_URL}/student-reports/${schoolPeriod.id}/socioeconomic-form-all`;

    this.coreService.isProcessing = true;

    this.httpClient.get<BlobPart>(url, {responseType: 'blob' as 'json'})
      .subscribe(response => {
        const currentDate = format(new Date(), 'yyyy_MM_dd_H_m_s');
        const filePath = URL.createObjectURL(new Blob([response]));
        const downloadLink = document.createElement('a');
        downloadLink.href = filePath;
        downloadLink.setAttribute('download', `Ficha_Socioeconomica_${schoolPeriod.codeSniese}_${currentDate}.xlsx`);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        this.coreService.isProcessing = false;
      });
  }
}
