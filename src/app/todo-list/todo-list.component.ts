import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToDoListItemModel } from '../models/todo-list-item.model';
import { ToDoListItemService } from '../services/todo-list-item.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {
  toDoListItems: ToDoListItemModel[] = [];
  subscription!: Subscription;
  filterDescription: string | null = null;
  filterIsCompleted: boolean | null = null;
  pageCount = 1;
  pageNumber = 0;

  constructor(private todoListItemService: ToDoListItemService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        const p = params.page;
        if (p == null) {
          return;
        }
        this.pageNumber = p;
        this.onFetchToDoListItems();
      }
    );

    this.subscription = this.todoListItemService.itemsChanged.subscribe(
      i => {
        this.onFetchToDoListItems();
      });

    this.onFetchToDoListItems();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onFetchToDoListItems(): void {
    this.todoListItemService.fetchToDoItems(25, this.pageNumber, this.filterIsCompleted, this.filterDescription).subscribe(
      result => {
        this.toDoListItems = result.items;
        this.pageCount = result.pageCount === 0 ? 1 : result.pageCount;
      });
  }

  onNewToDoListItemClick(): void {
    this.toDoListItems.push(new ToDoListItemModel(null, null, false, false));
  }

  statusFilterClicked(status: boolean | null, event: any): void {
    const target = event.target;
    if (target.checked) {
      this.filterIsCompleted = status;
      this.onFetchToDoListItems();
    }
  }

}
