import { ToDoListItemModel } from './todo-list-item.model';

export class GetToDoListItemsResultModel {

  constructor(
    public pageSize: number | null,
    public pageNumber: number | null,
    public pageCount: number,
    public items: ToDoListItemModel[]
    ) {  }
}
