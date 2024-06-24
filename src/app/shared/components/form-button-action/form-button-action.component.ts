import {Component, EventEmitter, inject, Output} from '@angular/core';
import {IconButtonActionEnum, LabelButtonActionEnum, SeverityButtonActionEnum} from "@shared/enums";
import {CoreService} from "@services/core";

@Component({
  selector: 'app-form-button-action',
  templateUrl: './form-button-action.component.html',
  styleUrl: './form-button-action.component.scss'
})
export class FormButtonActionComponent {
  @Output() submit: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  protected readonly coreService = inject(CoreService);

  protected readonly IconButtonActionEnum = IconButtonActionEnum;
  protected readonly LabelButtonActionEnum = LabelButtonActionEnum;
  protected readonly SeverityButtonActionEnum = SeverityButtonActionEnum;
}
