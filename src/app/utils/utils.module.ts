import {NgModule,} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RolesPermissionsDirective} from '@utils/directives/roles-permissions.directive';
import {ErrorMessageDirective} from '@utils/directives/error-message.directive';
import {TokenDirective} from '@utils/directives/token.directive';
import {SkeletonModule} from 'primeng/skeleton';
import {TableModule} from 'primeng/table';
import {LabelDirective} from './directives/label.directive';
import {ProgressBarModule} from "primeng/progressbar";
import {ProgressBarComponent} from './components/progress-bar/progress-bar.component';
import {SkeletonComponent} from '@utils/components/skeleton/skeleton.component';
import {PaginatorModule} from "primeng/paginator";
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {TooltipModule} from "primeng/tooltip";
import {FileUploadModule} from "primeng/fileupload";
import {MessageModule} from "primeng/message";
import {InputTextareaModule} from "primeng/inputtextarea";
import {DividerModule} from "primeng/divider";
import {CardModule} from "primeng/card";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {ReactiveFormsModule} from "@angular/forms";
import {SearchComponent} from './components/search/search.component';
import {
  ActivePipe,
  DateFormatPipe,
  ExtensionsPipe, PartialPermissionPipe,
  RequiredPipe, RequiredSeverityPipe,
  RolePipe,
  SelecetedPipe,
  StatePipe
} from '@utils/pipes';
import {UserStatePipe} from "@utils/pipes/auth/userState.pipe";
import {SchoolPeriodsStatePipe} from "@utils/pipes/core/school-periods-state.pipe";
import {LocationComponent} from './components/location/location.component';
import {TagModule} from "primeng/tag";
import {FileListComponent} from './components/file-list/file-list.component';
import {FileUploadComponent} from './components/file-upload/file-upload.component';
import {PanelMenuModule} from "primeng/panelmenu";
import {SidebarModule} from "primeng/sidebar";
import {SpeedDialModule} from "primeng/speeddial";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {ConfirmationService} from "primeng/api";
import {SizesPipe} from "@utils/pipes/common/sizes.pipe";
import {ImageUploadComponent} from "@utils/components/image-upload/image-upload.component";
import {HeaderFormComponent} from './components/header-form/header-form.component';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {HelpFieldComponent} from './components/help-field/help-field.component';
import {ErrorsFieldComponent} from './components/errors-field/errors-field.component';
import {PanelModule} from "primeng/panel";
import {IsVisiblePipe} from "@utils/pipes/core/is-visible.pipe";
import {VisibleComponent} from './components/visible/visible.component';
import {DialogModule} from "primeng/dialog";
import {ButtonActionComponent} from './components/button-action/button-action.component';
import {MapComponent} from './components/map/map.component';
import {AcademicStatePipe} from "@utils/pipes/core/academic-state.pipe";
import {EnrollmentStatePipe} from "@utils/pipes/core/enrollment-state.pipe";
import {AcademicStateSeverityPipe} from "@utils/pipes/core/academic-state-severity.pipe";
import {FormButtonActionComponent} from "@utils/components/form-button-action/form-button-action.component";
import {FormHelpFieldComponent} from "@utils/components/form-help-field/form-help-field.component";
import {MessageDialogComponent} from "@utils/components/message-dialog/message-dialog.component";
import {MessageConfirmDialogComponent} from "@utils/components/message-confirm-dialog/message-confirm-dialog.component";
import {ToastModule} from "primeng/toast";
import {EnabledPipe} from "@utils/pipes/core/enabled.pipe";

@NgModule({
  declarations: [
    SkeletonComponent,
    ProgressBarComponent,
    SearchComponent,
    ErrorMessageDirective,
    LabelDirective,
    RolesPermissionsDirective,
    TokenDirective,
    ExtensionsPipe,
    DateFormatPipe,
    RolePipe,
    ActivePipe,
    UserStatePipe,
    SchoolPeriodsStatePipe,
    SizesPipe,
    LocationComponent,
    FileListComponent,
    FileUploadComponent,
    ImageUploadComponent,
    HeaderFormComponent,
    StatePipe,
    HelpFieldComponent,
    ErrorsFieldComponent,
    IsVisiblePipe,
    SelecetedPipe,
    VisibleComponent,
    ButtonActionComponent,
    MapComponent,
    AcademicStatePipe,
    EnrollmentStatePipe,
    RequiredPipe,
    RequiredSeverityPipe,
    PartialPermissionPipe,
    AcademicStateSeverityPipe,
    FormButtonActionComponent,
    HelpFieldComponent,
    FormHelpFieldComponent,
    MessageDialogComponent,
    MessageConfirmDialogComponent,
    EnabledPipe
  ],
  exports: [
    SkeletonComponent,
    ProgressBarComponent,
    SearchComponent,
    LocationComponent,
    ErrorMessageDirective,
    LabelDirective,
    RolesPermissionsDirective,
    TokenDirective,
    ExtensionsPipe,
    DateFormatPipe,
    RolePipe,
    ActivePipe,
    UserStatePipe,
    SchoolPeriodsStatePipe,
    SizesPipe,
    FileListComponent,
    FileUploadComponent,
    ImageUploadComponent,
    HeaderFormComponent,
    StatePipe,
    HelpFieldComponent,
    ErrorsFieldComponent,
    IsVisiblePipe,
    SelecetedPipe,
    VisibleComponent,
    ButtonActionComponent,
    MapComponent,
    AcademicStatePipe,
    EnrollmentStatePipe,
    RequiredPipe,
    RequiredSeverityPipe,
    PartialPermissionPipe,
    AcademicStateSeverityPipe,
    FormButtonActionComponent,
    FormHelpFieldComponent,
    MessageDialogComponent,
    MessageConfirmDialogComponent,
    EnabledPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SkeletonModule,
    TableModule,
    ProgressBarModule,
    PaginatorModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    TooltipModule,
    FileUploadModule,
    MessageModule,
    InputTextareaModule,
    DividerModule,
    CardModule,
    OverlayPanelModule,
    TagModule,
    PanelMenuModule,
    SidebarModule,
    SpeedDialModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    PanelModule,
    DialogModule,
    ToastModule,
  ],
  providers: [ConfirmationService]
})
export class UtilsModule {
}
