import { Component, OnInit } from '@angular/core';
import {TaskService} from 'src/app/task.service'
import { ActivatedRoute, Params } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { List } from 'src/app/models/list.model';
@Component({
  selector: 'app-taskview',
  templateUrl: './taskview.component.html',
  styleUrls: ['./taskview.component.scss']
})
export class TaskviewComponent implements OnInit {
  lists:List[];
  tasks:Task[];
  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit(){
    this.route.params.subscribe(
      (params:Params)=>{
        console.log(params);
        this.taskService.getTasks(params.listId).subscribe((tasks:Task[])=>{
          this.tasks = tasks;
        })
      }
    )
    this.taskService.getLists().subscribe((lists:List[])=>{
     this.lists = lists;
    })
  }

onTaskClick(task:Task){
  this.taskService.complete(task).subscribe(()=>{
    console.log("completed successfully");
    task.completed=!task.completed;
  })
}
  

}
