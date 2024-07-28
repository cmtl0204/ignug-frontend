import {Pipe, PipeTransform} from '@angular/core';
import {UserModel} from "@models/auth";

type Severity =
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'secondary'
  | 'contrast'
  | undefined;

@Pipe({
  name: 'userState'
})
export class UserStatePipe implements PipeTransform {

  transform(user: UserModel): Severity {
    if (user.suspendedAt) return 'danger';

    if (user.maxAttempts === 0) return 'warning';

    return 'success';
  }

}
