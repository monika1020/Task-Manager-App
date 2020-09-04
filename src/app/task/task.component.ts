import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  public fbFormGroup = this.fb.group({
    task: ['', Validators.required],

  });

  public counter = 0;

  public increment() {
    this.counter += 1;
  }
  public list = [];
  public newTask;

  async addTask() {

    const data = this.fbFormGroup.value;
    const url = 'http://localhost:3000/addtask';

    await this.http.post(url, data).toPromise();
    this.list.push(this.newTask);
    this.newTask = '';
  }

  public deleteTask(index) {

    this.list.splice(index, 1);

  }



  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {

  }



}
