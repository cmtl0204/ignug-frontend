import {Pipe, PipeTransform} from '@angular/core';
import {CatalogueModel} from "@models/core";
import {Severity} from "@utils/pipes/types.type";

@Pipe({
  name: 'requiredSeverity'
})
export class RequiredSeverityPipe implements PipeTransform {

  transform(value: boolean): Severity {
    return value  ? 'danger' : 'info';
  }

}
