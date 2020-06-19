import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
  isVisible: boolean;

  validateForm:FormGroup;

  constructor() {}

  ngOnInit(): void {}

  handleCancel() {}

  handleOk() {
    this.submitForm();
  }

  submitForm(){}
}
