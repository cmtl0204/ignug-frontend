import {Component, OnInit} from '@angular/core';
import {PrimeIcons} from "primeng/api";

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css']
})
export class ForbiddenComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  protected readonly PrimeIcons = PrimeIcons;
}
