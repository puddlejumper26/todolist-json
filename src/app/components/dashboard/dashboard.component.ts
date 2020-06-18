import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  todoTitle: string = '';

  dataArray: Array<Object> = [];
  doneArray: Array<Object> = [];
  doingArray: Array<Object> = [];

  constructor(private message: NzMessageService) {}

  ngOnInit(): void {
    this.getTodoList();
  }

  addTodo() {
    if (this.todoTitle === '') {
      this.message.info('please input title');
    } else {
      const item={
        done: false,
        title: this.todoTitle
      }
      this.doingArray.push(item);
      this.dataArray.push(item);
      this.todoTitle='';
      localStorage.setItem('data', JSON.stringify(this.dataArray));
    }
  }

  getTodoList(): void {
    const dataString: string = localStorage.getItem('data');

    if (dataString != null) {
      this.dataArray = JSON.parse(dataString);
      for (let i = 0; i < this.dataArray.length; i++) {
        const element: any = this.dataArray[i];
        if (element.done === true) {
          this.doneArray.push(element);
        } else {
          this.doingArray.push(element);
        }
      }
    }
  }
}
