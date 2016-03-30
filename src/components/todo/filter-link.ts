import {Component, Input, Inject} from 'angular2/core';
import {setCurrentFilter} from '../../actions/todo';

@Component({
  selector: 'filter-link',
  template: `
    <a href="#" (click)="applyFilter()"
        [ngClass]="{'active': active(), 'inactive': !active()}">
      <ng-content></ng-content>
    </a>
    `
})
export class FilterLink {

  @Input() filter: string;

  constructor(
    @Inject('ngRedux') private store
  ) {

  }

  private applyFilter() {
    this.store.dispatch(setCurrentFilter(this.filter));
  }

  private active() {
    return this.filter === this.store.getState().uiState.currentFilter;
  }
}
