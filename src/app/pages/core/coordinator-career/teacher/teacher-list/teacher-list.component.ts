import {Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {TeacherModel, ColumnModel, SelectTeacherDto, CareerModel} from '@models/core';
import {
  BreadcrumbService,
  TeachersHttpService,
  CoreService,
  MessageService,
  RoutesService,
  CareersHttpService, CareersService
} from '@services/core';
import {BreadcrumbEnum} from "@utils/enums";

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TeacherListComponent implements OnInit {
  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly careersHttpService = inject(CareersHttpService);
  protected readonly careersService = inject(CareersService);
  private readonly teachersHttpService = inject(TeachersHttpService);
  public readonly coreService = inject(CoreService);
  private readonly routesService = inject(RoutesService);
  public readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  protected readonly PrimeIcons = PrimeIcons;
  protected buttonActions: MenuItem[] = this.buildButtonActions;
  protected columns: ColumnModel[] = this.buildColumns;
  protected isButtonActions: boolean = false;
  protected search: FormControl = new FormControl('');
  protected selectedItem: SelectTeacherDto = {};
  protected selectedItems: TeacherModel[] = [];
  protected items: TeacherModel[] = [];
  protected selectedCareer = new FormControl<CareerModel>(this.careersService.career);

  constructor() {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.TEACHERS},
    ]);

    this.selectedCareer.valueChanges.subscribe(value => {
      this.findTeachersByCareer();
    });
  }

  ngOnInit() {
    this.findTeachersByCareer();
  }

  findTeachersByCareer() {
    if (this.selectedCareer.value?.id) {
      this.careersHttpService.findTeachersByCareer(this.selectedCareer.value.id)
        .subscribe((response) => {
          this.items = response;
        });
    }
  }

  get buildColumns(): ColumnModel[] {
    return [
      {field: 'identification', header: 'Número de Documento'},
      {field: 'user', header: 'Docente'},
    ];
  }

  get buildButtonActions(): MenuItem[] {
    return [
      {
        label: 'Actualizar',
        icon: PrimeIcons.PENCIL,
        command: () => {
          if (this.selectedItem?.id) this.redirectEditForm(this.selectedItem.id);
        },
      },
    ];
  }

  removeAll() {
    this.messageService.questionDelete().then((result) => {
      if (result.isConfirmed) {
        this.teachersHttpService.removeAll(this.selectedItems).subscribe((Teachers) => {
          this.selectedItems.forEach(ItemDeleted => {
            this.items = this.items.filter(item => item.id !== ItemDeleted.id);
          });
          this.selectedItems = [];
        });
      }
    });
  }

  /** Select & Paginate **/
  selectItem(item: TeacherModel) {
    this.isButtonActions = true;
    this.selectedItem = item;
  }

  /** Redirects **/
  redirectCreateForm() {
    this.router.navigate([this.routesService.teachersCoordinatorCareer, 'new']);
  }

  redirectEditForm(id: string) {
    this.router.navigate([this.routesService.teachersCoordinatorCareer, id]);
  }
}
