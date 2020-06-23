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

  modalVisible: boolean = false;

  dataArray: Array<Object> = [];
  doneArray: Array<Object> = [];
  doingArray: Array<Object> = [];

  editTitle: string = '';
  editDate: string = '';
  editIndex: number = 0;
  editDone: boolean = false;
  modalIsVisible: boolean = false;

  constructor(private message: NzMessageService) {}

  ngOnInit() {
    this.getTodoList();
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

  addTodo(): void {
    this.editTitle = '';
    this.editDate = '';
    this.editDone = false;
    this.editIndex = 0;
    this.modalIsVisible = true;
  }

  addTodoEvent(data: Object){
    const item = {
      title: data['title'],
      date: data['date'],
      done: data['done'],
    };

    if(data['done'] === true){
      this.doneArray[data['index']]=item;
    }else{
      if(data['isEdit'] === true){
        this.doingArray[data['index']]=item;
      }else{
        this.doingArray.push(item);
      }
    }
    this.dataArray = this.doingArray.concat(this.doneArray);
    localStorage.setItem('data', JSON.stringify(this.dataArray));
  }

  checkItem(data: Object) {
    const index: number = data['index'];
    const done: boolean = data['done'];

    const newItem: Object = {
      title: data['title'],
      date: data['date'],
      done: done,
    };

    if (done) {
      this.doingArray.splice(index, 1);
      this.doneArray.push(newItem);
    }else {
      this.doneArray.splice(index,1);
      this.doingArray.push(newItem);
    }

    this.dataArray = this.doingArray.concat(this.doneArray);
    localStorage.setItem('data', JSON.stringify(this.dataArray));
  }

  editItem(data: Object) {
    this.editTitle = data['title'];
    this.editDate = data['date'];
    this.editDone = data['done'];
    this.editIndex = data['index'];
    this.modalVisible = true;
  }

  deleteItem(data: Object) {
    const index: number = data['index'];
    const done: number = data['done'];
    if(done){
      this.doneArray.splice(index,1);
    }else{
      this.doingArray.splice(index,1);
    }
    this.dataArray = this.doingArray.concat(this.doneArray);
    localStorage.setItem('data', JSON.stringify(this.dataArray));
  }
}
