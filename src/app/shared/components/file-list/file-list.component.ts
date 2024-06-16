import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ConfirmationService, MenuItem, PrimeIcons} from "primeng/api";
import {CatalogueModel, ColumnModel, EventModel, FileModel, ModelI, PaginatorModel, SelectEventDto} from "@models/core";
import {CoreService, FilesHttpService, MessageService, OverlaysService} from "@services/core";

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  @Input() acceptAttributes = '.pdf,.txt,.doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx,.zip,.rar,.7z,.tar, image/*';
  @Input() multiple = true;
  @Input() maxFileSize = 10240000 * 20;
  @Input() fileLimit = 20;
  @Input() modelId: string = '';
  @Input() isVisible: boolean = false;
  @Input() enabled: boolean = true;
  @Input() types: CatalogueModel[] = [];
  @Output() isHide: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() selectedType: EventEmitter<CatalogueModel> = new EventEmitter<CatalogueModel>();
  @Output() files: EventEmitter<FileModel[]> = new EventEmitter<FileModel[]>();
  protected buttonActions: MenuItem[] = [];
  protected columns: ColumnModel[] = this.buildColumns;
  protected isButtonActions: boolean = false;
  protected paginator: PaginatorModel;
  protected search: FormControl = new FormControl('');
  protected type: FormControl = new FormControl();
  protected selectedItem: SelectEventDto = {};
  protected selectedItems: EventModel[] = [];
  protected items: EventModel[] = [];
  @Input() isDialog = true;

  constructor(
    private readonly confirmationService: ConfirmationService,
    public readonly coreService: CoreService,
    public readonly filesHttpService: FilesHttpService,
    public readonly messageService: MessageService,
    private readonly overlaysService: OverlaysService
  ) {

    this.paginator = this.coreService.paginator;

    this.search.valueChanges.subscribe(value => {
      if (value.length === 0) {
        this.findByModel();
      }
    });

    this.type.valueChanges.subscribe(value => {
      this.selectedType.emit(value);
    });
  }

  ngOnInit(): void {
    this.findByModel();
  }

  findByModel(page: number = 0) {
    this.filesHttpService.findByModel(this.modelId, page, this.search.value)
      .subscribe((response) => {
        this.paginator = response.pagination!;
        this.items = response.data;
        this.files.emit(this.items);
      });
  }

  get buildColumns(): ColumnModel[] {
    return [
      {field: 'originalName', header: 'Nombre'},
      {field: 'extension', header: 'Extensión'},
      {field: 'type', header: 'Tipo'},
      {field: 'size', header: 'Tamaño'},
    ];
  }

  selectItem(item: EventModel) {
    this.selectedItem = item;
    this.buildButtonActions();
    this.isButtonActions = true;
  }

  paginate(event: any) {
    this.findByModel(event.page);
  }

  buildButtonActions(): void {
    this.buttonActions = [];

    this.buttonActions.push(
      {
        icon: PrimeIcons.DOWNLOAD,
        command: () => {
          if (this.selectedItem?.id) this.download(this.selectedItem);
        },
      });
  }

  download(file: FileModel) {
    this.filesHttpService.downloadFile(file);
  }

  remove(event: Event, id: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      ...this.overlaysService.deleteConfirmPopup,
      accept: () => {
        this.filesHttpService.remove(id).subscribe(() => {
          this.items = this.items.filter(item => item.id !== id);
          this.paginator.totalItems--;
          this.files.emit(this.items);
        });
      }
    });
  }
}
