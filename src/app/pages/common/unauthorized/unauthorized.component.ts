import { Component } from '@angular/core';
import {PrimeIcons} from "primeng/api";

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent {

  protected readonly PrimeIcons = PrimeIcons;
}
