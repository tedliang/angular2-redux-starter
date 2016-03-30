import {isBlank, isPresent} from 'angular2/src/facade/lang';
import {BaseException} from 'angular2/src/facade/exceptions';
import {Pipe, PipeTransform} from 'angular2/core';
import {List} from 'immutable';

@Pipe({
  name: 'visibleTodos'
})
export class VisibleTodosPipe implements PipeTransform {
  transform(todos, args) {
    if (isBlank(args) || args.length === 0) {
      throw new BaseException('VisibleTodos pipe requires one argument');
    }
    if (isPresent(todos) && !List.isList(todos)) {
      return todos;
    }
    return this.getVisibleTodos(todos, args[0]);
  }

  private getVisibleTodos(todos, filter) {
    switch (filter) {
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed);
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  };
}
