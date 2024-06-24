import { Component } from '@angular/core';
import {PrimeIcons} from "primeng/api";

@Component({
  selector: 'app-internal-server-error',
  templateUrl: './internal-server-error.component.html',
  styleUrls: ['./internal-server-error.component.css']
})
export class InternalServerErrorComponent {

  protected readonly PrimeIcons = PrimeIcons;
}
