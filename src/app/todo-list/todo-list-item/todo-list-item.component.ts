import { Component, Input, OnInit } from '@angular/core';
import { ToDoListItemModel } from 'src/app/models/todo-list-item.model';
import { ToDoListItemService } from 'src/app/services/todo-list-item.service';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss']
})
export class TodoListItemComponent implements OnInit {
  isMouseOver = false;
  isEditMode = false;
  prevDescription!: string;
  @Input() toDoListItem!: ToDoListItemModel;

  constructor(private todoListItemService: ToDoListItemService) { }

  ngOnInit(): void {
    if (this.toDoListItem.id == null) {
      this.isEditMode = true;
    }
  }

  onMouseEnter(): void {
    this.isMouseOver = true;
  }

  onMouseLeave(): void {
    this.isMouseOver = false;
  }

  onClick(): void {
    this.isMouseOver = false;
    if (this.toDoListItem.id == null) {
      return;
    }

    if (this.toDoListItem.isCompleted) {
      this.todoListItemService.uncompleteToDoItem(this.toDoListItem.id).subscribe(
        result => {
          this.toDoListItem.isCompleted = false;
        }
      );
    }
    else {
      this.todoListItemService.completeToDoItem(this.toDoListItem.id).subscribe(
        result => {
          this.toDoListItem.isCompleted = true;
        }
      );
    }
  }

  onEditClick(): void {
    if (this.toDoListItem.description == null) {
      return;
    }

    this.prevDescription = this.toDoListItem.description;
    this.isEditMode = true;
  }

  onSaveClick(): void {
    if (this.toDoListItem.id != null && this.toDoListItem.description != null) {
      this.todoListItemService.updateToDoItem(this.toDoListItem.id, this.toDoListItem.description).subscribe(
        result => {
          this.isEditMode = false;
        });
    }
    else {
      this.todoListItemService.createToDoItem(this.toDoListItem.description ?? '').subscribe(
        result => {
          this.toDoListItem.id = result.id;
          this.isEditMode = false;
        });
      }
  }

  onCancelClick(): void {
    this.toDoListItem.description = this.prevDescription;
    this.isEditMode = false;
  }

  onDeleteClick(): void {
    if (this.toDoListItem.id == null) {
      return;
    }

    this.todoListItemService.deleteToDoItem(this.toDoListItem.id).subscribe(
      result => {

      });
  }
}
