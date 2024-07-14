import {inject, Injectable, signal} from '@angular/core';
import {ServerResponse} from '@models/http-response';
import {BehaviorSubject, Observable} from "rxjs";
import {MessageService, PrimeIcons} from "primeng/api";

type Severity =
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'help'
  | 'primary'
  | 'secondary'
  | 'contrast'
  | null
  | undefined;

@Injectable({
  providedIn: 'root'
})
export class MessageDialogService {
  private readonly messageService = inject(MessageService);
  private _modalVisible: boolean = false;
  private _modalConfirmVisible: boolean = false;
  private _modalTitle: string = '';
  private _modalAcceptSeverity: Severity = null;
  private _modalRejectSeverity: Severity = 'danger';
  private _modalMessage: string | string[] = '';
  private _modalIcon: string  = '';
  private _modalIconColor: string  = '';
  private _toastSummary: string  = '';
  private _toastDetail: string  = '';
  private _modalResult = new BehaviorSubject<boolean>(true);
  public modalResult$:Observable<boolean> = this._modalResult.asObservable();

  accept(): void {
    console.log('accept component')
    this._modalResult.next(true);
  }

  reject(): void {
    this._modalResult.next(false);
  }

  constructor() {
  }

  errorCustom(title: string, message: string | string[]) {
    if (Array.isArray(message)) message.sort();

    this._modalVisible = true;
    this._modalAcceptSeverity = 'danger';
    this._modalTitle = title;
    this._modalMessage = message;
  }

  fieldErrors(message: string | string[]) {
    if (Array.isArray(message)) message.sort();

    this._modalVisible = true;
    this._modalAcceptSeverity = 'info';
    this._modalTitle = 'Existen errores en los siguientes campos';
    this._modalMessage = message;
  }

  questionDelete(title = '¿Está seguro de eliminar?', message = 'No podrá recuperar esta información!') {
    this._modalResult.next(false);

    this._modalConfirmVisible = true;
    this._modalAcceptSeverity = 'primary';
    this._modalRejectSeverity = 'danger';
    this._modalTitle = title;
    this._modalMessage = message;

    return this.modalResult$;
  }

  questionOnExit(title = '¿Está seguro de salir?', message = 'Se perderá la información que no haya guardado!') {
    // this._modalResult.next(false);
    console.log('entro exit');
    this._modalConfirmVisible = true;
    this._modalAcceptSeverity = 'primary';
    this._modalRejectSeverity = 'danger';
    this._modalTitle = title;
    this._modalMessage = message;
    this._modalIcon = PrimeIcons.QUESTION_CIRCLE;
    this._modalIconColor = '#969696FF';

    this._toastSummary = '';
    this._toastDetail = '';

    return this.modalResult$;
  }

  get modalTitle(): string {
    return this._modalTitle;
  }

  get modalIcon(): string {
    return this._modalIcon;
  }

  get modalIconColor(): string {
    return this._modalIconColor;
  }

  get toastSummary(): string {
    return this._toastSummary;
  }

  get toastDetail(): string {
    return this._toastDetail;
  }

  get modalMessage(): string | string[] {
    return this._modalMessage;
  }

  get modalAcceptSeverity(): Severity {
    return this._modalAcceptSeverity;
  }

  get modalRejectSeverity(): Severity {
    return this._modalRejectSeverity;
  }

  get modalVisible(): boolean {
    return this._modalVisible;
  }

  set modalVisible(value: boolean) {
    this._modalVisible = value;
  }

  get modalConfirmVisible(): boolean {
    return this._modalConfirmVisible;
  }

  set modalConfirmVisible(value: boolean) {
    this._modalConfirmVisible = value;
  }
}
