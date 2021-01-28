export class ToDoListItemModel {

  constructor(
    public id: number | null,
    public description: string | null,
    public isCompleted: boolean,
    public isDeleted: boolean) {  }
}
