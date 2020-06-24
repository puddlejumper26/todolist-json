import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';

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

  // editTitle: string = '';
  // editDate: string = '';
  // editIndex: number = 0;
  // editDone: boolean = false;

  editData: Object = {};

  modalIsVisible: boolean = false;

  // constructor(private message: NzMessageService) {}
  constructor(private message: NzMessageService, private http: HttpClient) {}

  ngOnInit() {
    this.getTodoList();
  }

  getTodoList(): void {
    // GET is to check and get element, check the data from http://localhost:3000/todos, and put them into
    //doneArray and doingArray after the for loop
    this.http
      .get('http://localhost:3000/todos')
      .subscribe((res: Array<Object>) => {
        this.dataArray = res;
        this.doingArray = [];
        this.doneArray = [];
        console.log(3333);
        for (let i = 0; i < this.dataArray.length; i++) {  // note here is a for loop
          const element: any = this.dataArray[i];
          if (element.done === true) {
            this.doneArray.push(element);
            console.log(4444);
          } else {
            this.doingArray.push(element);
            console.log(555);
          }
        }
      });
  }

  // Now the function of this is only to open the dialog - edit-modal
  addTodo(data: Object): void {
    // if (this.todoTitle === '') {
    //   this.message.info('Please input title');
    // } else {
    //   // send the editData object to the server
    //   this.editData = {
    //     title: this.todoTitle, // to pass the content inside input to the edit-modal
    //     date: '',
    //     isEdit: true,
    //     id: 1, // now the new input will replace the old input, cause the id is 1
    //     done: false,
    //   };
    //   console.log(111111, this.editData);
    //   this.modalIsVisible = true;
    // }
    this.editData= {};
    this.modalIsVisible = true;
  }

  //combine with edit-modal clickEvent, clicking confirm and submit the form inside edit-modal
  addTodoEvent(data: Object) {
    console.log(77777);
    // if (data['done'] === true) {
    //   this.changeItemNetRequest(data);
    // } else {
    //   if (data['isEdit'] === true) {
    //     this.changeItemNetRequest(data);
    //   } else {
    //     //data['done'] == false && data['isEdit'] == false
    //     // POST is to add new element
    //     this.http.post('http://localhost:3000/todos', data).subscribe(() => {
    //       this.getTodoList();
    //     });
    //   }
    // }
    if(data['done'] === false && data['isEdit'] === false){
      this.http.post('http://localhost:3000/todos', data).subscribe(() => {
          // after post the new data to localhost:3000/todos then run getTodoList() again
          this.getTodoList();
          console.log(8888)
        });
    }else{
      // called when there is no change made
      this.changeItemNetRequest(data);
      console.log(999, data['idEdit']);
    }
  }

  checkItem(data: Object) {
    this.changeItemNetRequest(data);
    console.log(666);
  }

  // modify network request
  changeItemNetRequest(data: Object) {
    // PUT is to edit element
    this.http
      .put('http://localhost:3000/todos/' + data['id'], data)
      .subscribe(() => {
        this.getTodoList();
        console.log(2222,  data);
      });
  }

  editItem(data: Object) {
    this.editData = data;
    // open the edit-modal
    this.modalIsVisible = true;
  }

  deleteItem(data: Object) {
    this.http
      .delete('http://localhost:3000/todos/' + data['id'])
      .subscribe(() => {
        this.getTodoList();
      });
  }

  //********************************************
  // Following is the old code without JSON-SERVER
  //********************************************
  // getTodoList(): void {
  //   const dataString: string = localStorage.getItem('data');

  //   if (dataString != null) {
  //     this.dataArray = JSON.parse(dataString);
  //     for (let i = 0; i < this.dataArray.length; i++) {
  //       const element: any = this.dataArray[i];
  //       if (element.done === true) {
  //         this.doneArray.push(element);
  //       } else {
  //         this.doingArray.push(element);
  //       }
  //     }
  //   }
  // }

  // addTodo(): void {
  //   if (this.todoTitle === '') {
  //     this.message.info('Please input title');
  //   } else {
  //     this.editTitle = this.todoTitle;
  //     this.editDate = '';
  //     this.editDone = false;
  //     this.editIndex = 0;
  //     this.modalIsVisible = true;
  //   }
  // }

  // addTodoEvent(data: Object) {
  //   const item = {
  //     title: data['title'],
  //     date: data['date'],
  //     done: data['done'],
  //   };

  //   if (data['done'] === true) {
  //     this.doneArray[data['index']] = item;
  //   } else {
  //     if (data['isEdit'] === true) {
  //       this.doingArray[data['index']] = item;
  //     } else {
  //       this.doingArray.push(item);
  //     }
  //   }
  //   this.dataArray = this.doingArray.concat(this.doneArray);
  //   localStorage.setItem('data', JSON.stringify(this.dataArray));
  // }

  // checkItem(data: Object) {
  //   const index: number = data['index'];
  //   const done: boolean = data['done'];

  //   const newItem: Object = {
  //     title: data['title'],
  //     date: data['date'],
  //     done: done,
  //   };

  //   if (done) {
  //     this.doingArray.splice(index, 1);
  //     this.doneArray.push(newItem);
  //   } else {
  //     this.doneArray.splice(index, 1);
  //     this.doingArray.push(newItem);
  //   }

  //   this.dataArray = this.doingArray.concat(this.doneArray);
  //   localStorage.setItem('data', JSON.stringify(this.dataArray));
  // }

  // editItem(data: Object) {
  //   this.editTitle = data['title'];
  //   this.editDate = data['date'];
  //   this.editDone = data['done'];
  //   this.editIndex = data['index'];
  //   this.modalIsVisible = true;
  // }

  // deleteItem(data: Object) {
  //   const index: number = data['index'];
  //   const done: number = data['done'];
  //   if (done) {
  //     this.doneArray.splice(index, 1);
  //   } else {
  //     this.doingArray.splice(index, 1);
  //   }
  //   this.dataArray = this.doingArray.concat(this.doneArray);
  //   localStorage.setItem('data', JSON.stringify(this.dataArray));
  // }
}
