import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent {
  // @Input()
  // title: string = '';
  // @Input()
  // date: string = '';
  // @Input()
  // done: string = '';
  // @Input()
  // index: number = 0;

  @Input()
  isVisible: boolean;

  @Input()
  data: Object = {};

  @Output()
  clickEvent = new EventEmitter<Object>();
  @Output()
  isVisibleChange = new EventEmitter<boolean>();

  validateForm: FormGroup;
  isEdit: boolean;

  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required, Validators.maxLength(15)]],
      date: [null, [Validators.required]],
    });
  }

  ngOnInit() { }

  // ngOnChanges() {
  //   if (this.title) {
  //     this.isEdit = true;
  //     this.validateForm.setValue({
  //       title: this.title,
  //       date: this.date,
  //     });
  //   } else {
  //     this.isEdit = false;
  //     this.validateForm.setValue({
  //       title: '',
  //       date: '',
  //     });
  //   }
  // }

  ngOnChanges() {
    if (this.data['id']) {    //           <====
      this.isEdit = true;
      this.validateForm.setValue({
        title: this.data['title'],    //           <====
        date: this.data['date'],      //           <====
      });
    } else {
      this.isEdit = false;
      this.validateForm.setValue({
        title: '',
        date: '',
      });
    }
  }

  handleCancel(): void {
    this.isVisibleChange.emit(false);
  }

  handleOk(): void {
    this.submitForm();
  }

  submitForm(): void {
    let params = {};
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();

      if (this.validateForm.controls[i].status === 'DISABLED') {
        return;
      }
      if (
        this.validateForm.controls[i] &&
        this.validateForm.controls[i].value
      ) {
        params[i] = this.validateForm.controls[i].value;
      } else {
        params[i] = '';
      }
    }

    this.setDate('date');

    params['date'] = this.validateForm.get('date').value;
    params['isEdit'] = this.isEdit;

    // if (this.isEdit) {
    //   params['done'] = this.done;
    //   params['index'] = this.index;
    // }
    if(this.isEdit){
      params['id']=this.data['id'];
      params['done']=this.data['done'];
    }else{
      params['done']=false;
    }


    this.clickEvent.emit(params);
    this.isVisibleChange.emit(false);
  }

  setDate(dates) {
    const time = new Date(this.validateForm.get(dates).value);
    const dateTime =
      time.getFullYear() +
      '-' +
      this.formatDayAndMonth(time.getMonth() + 1) +
      '-' +
      this.formatDayAndMonth(time.getDate());
    this.validateForm.get(dates).setValue(dateTime);
  }

  formatDayAndMonth(val) {
    if (val < 10) {
      val = '0' + val;
    }
    return val;
  }
}
