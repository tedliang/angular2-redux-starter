import {
  async,
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
  injectAsync,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder }
from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RioForm } from './form';
import { NgFormModel, ControlGroup, Control, FormBuilder }
from '@angular/common';

describe('Component: Form', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [RioForm]);
  beforeEach(inject([TestComponentBuilder],
    function (tcb: TestComponentBuilder) {
      builder = tcb;
    }));

  it('should inject the component', inject([RioForm],
    (component: RioForm) => {
      expect(component).toBeTruthy();
    }));

  it('should create the component', async(inject([], () => {
    return builder.createAsync(RioFormTestController)
      .then((fixture: ComponentFixture<any>) => {
        fixture.autoDetectChanges();
        let query = fixture.debugElement
          .query(By.directive(RioForm));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
        expect(query.componentInstance.onSubmit).toBeTruthy();
        expect(query.componentInstance.formModel).toBeTruthy();
      });
  })));

  it('should emit event when onSubmit is invoked', async(inject([], () => {
    return builder.createAsync(RioFormTestController)
      .then((fixture: ComponentFixture<any>) => {
        fixture.autoDetectChanges();
        let query = fixture.debugElement
          .query(By.directive(RioForm));
        query.componentInstance.onSubmit.subscribe(c => {
          expect(c).toBeDefined();
        });
        query.nativeElement.querySelector('button').click();
      });
  })));

});

@Component({
  selector: 'test',
  template: `
    <rio-form
      [formModel]="group">
      <input
        [ngFormControl]="field1">
      <button type="submit">submit</button>
      </rio-form>
  `,
  directives: [RioForm]
})
class RioFormTestController {
  private group: ControlGroup;
  private field1: Control;
  constructor(private builder: FormBuilder) {
    this.field1 = new Control('test value');
    this.group = this.builder.group({
      field1: this.field1,
    });
  }
}

