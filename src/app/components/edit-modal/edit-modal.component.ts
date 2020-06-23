import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
  @Input()
  title: string = '';
  @Input()
  date: string = '';
  @Input()
  done: string = '';
  @Input()
  index: number = 0;
  @Input()
  isVisible: boolean;

  @Output()
  clickEvent = new EventEmitter<Object>();
  @Output()
  isVisibleChange = new EventEmitter<boolean>();

  validateForm: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  handleCancel() {
    this.isVisibleChange.emit(false);
  }

  handleOk() {
    this.submitForm();
  }

  submitForm() {}
}
