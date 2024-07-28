import {Pipe, PipeTransform} from '@angular/core';
import {CatalogueSchoolPeriodStateEnum} from "@utils/enums";
import {Severity} from "@utils/pipes/types.type";

@Pipe({
  name: 'schoolPeriodsState'
})
export class SchoolPeriodsStatePipe implements PipeTransform {

  transform(value: string): Severity {
    return value === CatalogueSchoolPeriodStateEnum.OPEN ? 'info' : 'warning';
  }

}
