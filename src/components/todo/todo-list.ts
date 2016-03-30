import {
  Component, Input, Output, Inject,
  ChangeDetectionStrategy, EventEmitter
} from 'angular2/core';
import {List} from 'immutable';
import {Todo} from '../../domain/todo';
import {VisibleTodosPipe} from './visible-pipe';
import {toggleTodo, toggleAllTodo, deleteTodo} from '../../actions/todo';

@Component({
  selector: 'todo-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  pipes: [VisibleTodosPipe],
  template: `
    <section id="main">
      <input class="toggle-all" type="checkbox" id="toggle-all"
            #toggleall 
            [checked]="allCompleted()" 
            (click)="setAllTo(toggleall.checked)">
      <label for="toggle-all">Mark all as complete</label>
      <ul id="todo-list">
        <li *ngFor="#todo of todos | visibleTodos:filter" 
            [ngClass]="{completed: todo.completed}">
          <div class="view">
            <input class="toggle" type="checkbox" 
                (change)="onToggleTodo(todo)" 
                [checked]="todo.completed">
            <label>{{todo.description}}</label>
            <button class="destroy" (click)="delete(todo)"></button>
          </div>
        </li>
      </ul>
    </section>
    `
})
export class TodoList {

  @Input() todos: List<Todo>;
  @Input() filter: string;
  @Output() toggleAll: EventEmitter<any> = new EventEmitter();
  @Output() deleteTodo: EventEmitter<any> = new EventEmitter();

  constructor(
    @Inject('ngRedux') private store
  ) {

  }

  private allCompleted() {
    return this.todos.size === this.todos.count(todo => todo.completed);
  }

  private setAllTo(completed: boolean) {
    this.store.dispatch(toggleAllTodo(completed));
  }

  private onToggleTodo(todo: Todo) {
    this.store.dispatch(toggleTodo(todo));
  }

  private delete(todo: Todo) {
    this.store.dispatch(deleteTodo(todo));
  }

}
