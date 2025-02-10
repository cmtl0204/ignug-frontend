import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CareerModel, EnrollmentDetailModel, GradeModel} from "@models/core";
import {PrimeIcons} from 'primeng/api';
import {SkeletonEnum} from "@utils/enums";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CoreService, GradesHttpService, MessageService, TeacherDistributionsService} from "@services/core";

@Component({
  selector: 'app-supplementary-grade-form',
  templateUrl: './supplementary-grade-form.component.html',
  styleUrls: ['./supplementary-grade-form.component.scss']
})
export class SupplementaryGradeFormComponent implements OnInit {
  @Input() enrollmentDetail!: EnrollmentDetailModel;
  @Output() isModalGrades = new EventEmitter<boolean>(true);
  protected form: FormGroup;
  protected readonly SkeletonEnum = SkeletonEnum;
  protected readonly PrimeIcons = PrimeIcons;
  protected formErrors: string[] = [];

  constructor(public coreService: CoreService,
              private formBuilder: FormBuilder,
              private gradesHttpServices: GradesHttpService,
              public messageService: MessageService,
              protected readonly teacherDistributionsService: TeacherDistributionsService,
  ) {
    this.form = this.newForm;
  }

  ngOnInit(): void {
    this.supplementaryGradeField.patchValue(this.enrollmentDetail.supplementaryGrade);
  }

  onSubmit(): void {
    if (this.validateForm) {
      this.save();
    } else {
      this.form.markAllAsTouched();
      this.messageService.errorsFields(this.formErrors);
    }
  }

  save() {
    this.gradesHttpServices.saveSupplementaryGradeByTeacher(this.enrollmentDetail.id!, this.form.value).subscribe(() => {
      this.isModalGrades.emit(false);
    });
  }

  get newForm(): FormGroup {
    return this.formBuilder.group({
      supplementaryGrade: [null, [Validators.required]]
    });
  }

  get validateForm() {
    this.formErrors = [];

    if (this.supplementaryGradeField.errors) this.formErrors.push('Examen Supletorio');

    this.formErrors.sort();
    return this.formErrors.length === 0 && this.form.valid;
  }

  get supplementaryGradeField(): AbstractControl {
    return this.form.controls['supplementaryGrade'];
  }
}
