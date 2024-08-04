import {Pipe, PipeTransform} from '@angular/core';
import {CatalogueModel} from "@models/core";

@Pipe({
  name: 'enabled'
})
export class EnabledPipe implements PipeTransform {

  transform(value: boolean): string {
    return value  ? 'HABILITADO' : 'INHABILITADO';
  }

}
