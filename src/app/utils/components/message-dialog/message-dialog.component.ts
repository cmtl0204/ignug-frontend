import {Component, inject} from '@angular/core';
import {MessageDialogService} from '@services/core';
import {PrimeIcons} from "primeng/api";

type Severity = 'success' | 'info' | 'warning' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrl: './message-dialog.component.scss'
})
export class MessageDialogComponent {
  protected readonly messageDialogService = inject(MessageDialogService);
  protected readonly Array = Array;
  protected readonly PrimeIcons = PrimeIcons;


}
