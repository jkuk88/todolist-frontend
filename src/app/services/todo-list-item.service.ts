import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToDoListItemModel } from '../models/todo-list-item.model';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GetToDoListItemsResultModel } from '../models/get-todo-list-item-result.model';

@Injectable({
  providedIn: 'root'
})
export class ToDoListItemService {
  itemsChanged = new Subject();

  constructor(private httpClient: HttpClient) {

  }

  fetchToDoItems(pageSize: number | null, pageNumber: number | null, isCompletedFilter: boolean | null, descriptionFilter: string | null)
  : Observable<GetToDoListItemsResultModel> {
    let httpParams = new HttpParams();

    if (pageSize !== null) { httpParams = httpParams.append('pageSize', pageSize.toString()); }
    if (pageNumber !== null) { httpParams = httpParams.append('pageNumber', pageNumber.toString()); }
    if (isCompletedFilter !== null) { httpParams = httpParams.append('isCompletedFilter', isCompletedFilter.toString()); }
    if (descriptionFilter !== null) { httpParams = httpParams.append('descriptionFilter', descriptionFilter.toString()); }

    return this.httpClient.get<GetToDoListItemsResultModel>(
      environment.backendUrl + 'ToDoListItem',
      {
        params: httpParams
      }
    );
  }

  completeToDoItem(id: number): Observable<any> {
    return this.httpClient.put(
      environment.backendUrl + 'ToDoListItem/' + id + '/complete',
      null
    ).pipe(
      tap(item => {
        this.itemsChanged.next();
      }));
  }

  uncompleteToDoItem(id: number): Observable<any> {
    return this.httpClient.put(
      environment.backendUrl + 'ToDoListItem/' + id + '/uncomplete',
      null
    ).pipe(
      tap(item => {
        this.itemsChanged.next();
      }));
  }

  updateToDoItem(id: number, description: string): Observable<any> {
    const data = {
      description
    };

    return this.httpClient.put(
      environment.backendUrl + 'ToDoListItem/' + id + '/update',
      data
    ).pipe(
      tap(item => {
        this.itemsChanged.next();
      }));
  }

  deleteToDoItem(id: number): Observable<any> {
    return this.httpClient.delete(
      environment.backendUrl + 'ToDoListItem/' + id
    ).pipe(
      tap(item => {
        this.itemsChanged.next();
      }));
  }

  createToDoItem(description: string): Observable<ToDoListItemModel> {
    const data = {
      description
    };

    return this.httpClient.post<ToDoListItemModel>(
      environment.backendUrl + 'ToDoListItem',
      data
    ).pipe(
      tap(item => {
        this.itemsChanged.next();
      }));
  }
}
