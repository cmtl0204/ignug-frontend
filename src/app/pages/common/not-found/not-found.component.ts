import {Component, inject, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {PrimeIcons} from "primeng/api";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {
  private _location = inject(Location);
  protected readonly PrimeIcons = PrimeIcons;

  goBack() {
    this._location.back();
  }
}
