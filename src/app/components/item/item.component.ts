import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  // @Input()
  // index: number;
  // @Input()
  // title: string;
  // @Input()
  // date: boolean;
  // @Input()
  // done: boolean;

  @Input()
  data: Object = {};

  @Output()
  checkItemEvent = new EventEmitter<Object>();
  @Output()
  editItemEvent = new EventEmitter<Object>();
  @Output()
  deleteItemEvent = new EventEmitter<Object>();

  confirmModal: NzModalRef;

  constructor(private modal: NzModalService) {}

  ngOnInit() {}

  checkItem(): void {
    // const data: Object = {
    //   index: this.index,
    //   date: this.date,
    //   title: this.title,
    //   done: this.done,
    // };
    // this.checkItemEvent.emit(data);
    this.checkItemEvent.emit(this.data);
  }

  editItem() {
    // const data: Object = {
    //   index: this.index,
    //   date: this.date,
    //   title: this.title,
    //   done: this.done,
    // };
    // this.editItemEvent.emit(data);
    this.editItemEvent.emit(this.data);
  }

  deleteItem() {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'DELETE',
      nzContent: 'Confirm to delete',
      nzOkText: 'Confirm',
      nzCancelText: 'Cancel',
      // nzOnOk: () => {
      //   const data: Object = {
      //     index: this.index,
      //     done: this.done,
      //   };
      //   this.deleteItemEvent.emit(data);
      // },
      nzOnOk: () => {
        this.deleteItemEvent.emit(this.data);
      },
    });
  }
}
