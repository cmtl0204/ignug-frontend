import {Component, Input, OnInit} from '@angular/core';
import {PrimeIcons} from "primeng/api";
import {MessageService} from "@services/core";
import {RoutesEnum} from "@shared/enums";

@Component({
  selector: 'app-header-form',
  templateUrl: './header-form.component.html',
  styleUrls: ['./header-form.component.scss']
})
export class HeaderFormComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  @Input() id: string | null = null;
  @Input() panelHeader: string | null = null;
  @Input() label: string = 'Crear';
  @Input() icon: string = PrimeIcons.PLUS;
  protected message: string = `Todos los campos con <b class="p-error">*</b> son obligatorios.`;

  constructor(protected messageService: MessageService) {

  }

  ngOnInit(): void {
    if (this.id) {
      if (this.id !== RoutesEnum.NEW) {
        this.label = 'Editar';
        this.icon = PrimeIcons.PENCIL;
      }
    }
  }

  protected readonly RoutesEnum = RoutesEnum;
}
