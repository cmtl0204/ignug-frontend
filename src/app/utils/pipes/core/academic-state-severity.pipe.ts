import {Pipe, PipeTransform} from '@angular/core';
import {CatalogueModel} from "@models/core";
import {Severity} from "@utils/pipes/types.type";

@Pipe({
  name: 'academicStateSeverity'
})
export class AcademicStateSeverityPipe implements PipeTransform {

  transform(value: string = ''): Severity {
    return value === 'a' ? 'success' : value === 'r' ? 'danger' : 'warning';
  }

}
