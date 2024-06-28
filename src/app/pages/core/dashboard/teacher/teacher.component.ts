import { Component } from '@angular/core';
import {BreadcrumbService} from "@services/core";

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent {
  value : any

  constructor(private breadcrumbService:BreadcrumbService) {
    breadcrumbService.setItems([{label: 'Dashboard'}])
  }
}
