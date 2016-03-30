import {Component, Inject, ViewEncapsulation} from 'angular2/core';
import {Todo} from '../domain/todo';
import {Header} from '../components/todo/header';
import {Filter} from '../components/todo/filter';
import {TodoList} from '../components/todo/todo-list';
import {Footer} from '../components/todo/footer';
import {addTodo} from '../actions/todo';

@Component({
  selector: 'rio-todo-page',
  directives: [Header, Filter, TodoList, Footer],
  styles: [require('./todo.css')],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div>
      <section id="todoapp">
        <todo-header (todo)="onAddTodo($event)"></todo-header>
        <div [hidden]="todos().size === 0">
          <todo-filter></todo-filter>
          <todo-list [todos]="todos()" [filter]="uiState().currentFilter"></todo-list>
          <todo-footer [count]="todos().size"></todo-footer>
        </div>
      </section>
      <footer id="info">
        <p>{{uiState().message}}</p>
        <p>Add, Remove and Complete TODOs</p>
      </footer>
    </div>
  `
})
export class RioTodoPage {
  constructor(
    @Inject('ngRedux') private store
  ) {

  }

  private todos() {
    return this.store.getState().todos;
  }

  private uiState() {
    return this.store.getState().uiState;
  }

  onAddTodo(description) {
    let newTodo = new Todo({id: Math.random(), description});
    this.store.dispatch(addTodo(newTodo));
  }
}
