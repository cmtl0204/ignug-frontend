import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router} from '@angular/router';
import {MenuItem, PrimeIcons} from "primeng/api";
import {SelectUserDto, UserModel} from '@models/auth';
import {ColumnModel, PaginatorModel} from '@models/core';
import {AuthService, UsersHttpService} from '@services/auth';
import {BreadcrumbService, CoreService, MessageService} from '@services/core';
import {BreadcrumbEnum, IconButtonActionEnum, LabelButtonActionEnum} from "@utils/enums";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  protected buttonActions: MenuItem[] = this.buildButtonActions;
  protected isButtonActions: boolean = false;
  protected columns: ColumnModel[] = this.buildColumns;
  protected paginator: PaginatorModel;
  protected search: FormControl = new FormControl('');
  protected selectedUser: SelectUserDto = {};
  protected selectedUsers: UserModel[] = [];
  protected users: UserModel[] = [];

  constructor(
    public authService: AuthService,
    public coreService: CoreService,
    private breadcrumbService: BreadcrumbService,
    public messageService: MessageService,
    private router: Router,
    private usersHttpService: UsersHttpService,
  ) {
    this.breadcrumbService.setItems([{label: BreadcrumbEnum.USERS}]);

    this.paginator = this.coreService.paginator;

    this.search.valueChanges.pipe(debounceTime(1000)).subscribe(value => {
      this.findAll();
    });
  }

  ngOnInit() {
    this.findAll();
  }

  findAll(page: number = 0) {
    this.usersHttpService.findAll(page, this.search.value)
      .subscribe((response) => {
        this.paginator = response.pagination!;
        this.users = response.data
      });
  }

  get buildColumns(): ColumnModel[] {
    return [
      {field: 'username', header: 'Usuario'},
      {field: 'lastname', header: 'Apellidos'},
      {field: 'name', header: 'Nombres'},
      {field: 'email', header: 'Correo'},
      {field: 'roles', header: 'Roles'},
      {field: 'suspendedAt', header: 'Estado'}
    ];
  }

  get buildButtonActions(): MenuItem[] {
    return [
      {
        label: LabelButtonActionEnum.UPDATE,
        icon: IconButtonActionEnum.UPDATE,
        command: () => {
          if (this.selectedUser?.id) this.redirectEditForm(this.selectedUser.id);
        },
      },
      {
        label: LabelButtonActionEnum.SUSPEND,
        icon: IconButtonActionEnum.SUSPEND,
        command: () => {
          if (this.selectedUser?.id) this.suspend(this.selectedUser.id);
        },
      },
      {
        label: LabelButtonActionEnum.REACTIVATE,
        icon: IconButtonActionEnum.REACTIVATE,
        command: () => {
          if (this.selectedUser?.id) this.reactivate(this.selectedUser.id);
        },
      },
    ];
  }

  paginate(event: any) {
    this.findAll(event.page);
  }

  redirectCreateForm() {
    this.router.navigate(['/admin/users', 'new']);
  }

  redirectEditForm(id: string) {
    this.router.navigate(['/admin/users', id]);
  }

  selectUser(user: UserModel) {
    this.isButtonActions = true;
    this.selectedUser = user;
  }

  suspend(id: string) {
    this.usersHttpService.suspend(id).subscribe(user => {
      const index = this.users.findIndex(user => user.id === id);
      this.users[index] = user;
    });
  }

  reactivate(id: string) {
    this.usersHttpService.reactivate(id).subscribe(user => {
      const index = this.users.findIndex(user => user.id === id);
      this.users[index] = user;
    });
  }
}
