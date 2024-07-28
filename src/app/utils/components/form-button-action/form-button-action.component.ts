import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {IconButtonActionEnum, LabelButtonActionEnum, SeverityButtonActionEnum} from "@utils/enums";
import {CoreService} from "@services/core";
import {Severity} from "@utils/pipes/types.type";

@Component({
  selector: 'app-form-button-action',
  templateUrl: './form-button-action.component.html',
  styleUrl: './form-button-action.component.scss'
})
export class FormButtonActionComponent {
  @Output() submit: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Input() labelSubmitButton: string = LabelButtonActionEnum.SAVE;
  @Input() labelCancelButton: string = LabelButtonActionEnum.CANCEL;
  @Input() iconSubmitButton: string = IconButtonActionEnum.SAVE;
  @Input() iconCancelButton: string = IconButtonActionEnum.CANCEL;
  @Input() severitySubmitButton: Severity = undefined;
  @Input() severityCancelButton: Severity = SeverityButtonActionEnum.CANCEL;
  @Input() isVisibleCancelButton = true;

  protected readonly coreService = inject(CoreService);

  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;
}
