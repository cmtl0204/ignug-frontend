import {Pipe, PipeTransform} from '@angular/core';
import {CatalogueEnrollmentStateEnum} from "@shared/enums";
import {Severity} from "@shared/pipes/types.type";

@Pipe({
  name: 'enrollmentState'
})
export class EnrollmentStatePipe implements PipeTransform {

  transform(value: string): Severity {
    switch (value) {
      case CatalogueEnrollmentStateEnum.REGISTERED:
        return 'warning';
      case CatalogueEnrollmentStateEnum.REQUEST_SENT:
        return 'info';
      case CatalogueEnrollmentStateEnum.APPROVED:
        return undefined;
      case CatalogueEnrollmentStateEnum.REJECTED:
        return 'danger';
      case CatalogueEnrollmentStateEnum.ENROLLED:
        return 'success';
      case CatalogueEnrollmentStateEnum.REVOKED:
        return 'danger';
      default:
        return 'secondary'
    }
  }

}
