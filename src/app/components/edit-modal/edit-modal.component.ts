import { Component, OnInit, Input } from '@angular/core';
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

  validateForm: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  handleCancel() {}

  handleOk() {
    this.submitForm();
  }

  submitForm() {}
}
