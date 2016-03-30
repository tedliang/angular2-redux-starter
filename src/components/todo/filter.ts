import {Component} from 'angular2/core';
import {FilterLink} from './filter-link';

@Component({
  selector: 'todo-filter',
  directives: [FilterLink],
  styles: ['p{text-align: right; margin-right: 10px;}'],
  template: `
    <p>Show:
      <filter-link filter="SHOW_ALL">All</filter-link>,  
      <filter-link filter="SHOW_ACTIVE">Active</filter-link>, 
      <filter-link filter="SHOW_COMPLETED">Completed</filter-link>
    </p>
    `
})
export class Filter {
}
