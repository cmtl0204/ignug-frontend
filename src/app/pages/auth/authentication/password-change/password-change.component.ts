import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PrimeIcons} from "primeng/api";
import {CustomValidators} from "@utils/validators";
import {AuthHttpService, AuthService} from '@services/auth';
import {CoreService, MessageService} from '@services/core';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  form: FormGroup;

  constructor(
    private authHttpService: AuthHttpService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    protected coreService: CoreService,
    private formBuilder: FormBuilder,
    public messageService: MessageService,
  ) {
    this.form = this.newForm();
  }

  ngOnInit(): void {

  }

  newForm(): FormGroup {
    return this.formBuilder.group({
      passwordConfirmation: [null, [Validators.required]],
      passwordNew: [null, [Validators.required, Validators.minLength(8)]],
      passwordOld: [null, [Validators.required]],
    }, {validators: CustomValidators.passwordMatchValidator});
  }

  onSubmit() {
    if (this.form.valid) {
      this.changePassword();
    } else {
      this.form.markAllAsTouched();
      this.messageService.errorsFields();
    }
  }

  changePassword() {
    this.authHttpService.changePassword(this.authService.auth.id, this.form.value).subscribe((_) => {
    });
  }

  get passwordConfirmationField() {
    return this.form.controls['passwordConfirmation'];
  }

  get passwordNewField() {
    return this.form.controls['passwordNew'];
  }

  get passwordOldField() {
    return this.form.controls['passwordOld'];
  }
}
