import {Component, View, Inject, enableProdMode, provide} from 'angular2/core';
import {bootstrap} from 'angular2/bootstrap';
import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';
import configureStore from './store/configure-store';
import App from './containers/app';
//import {provider} from 'ng2-redux';
import {provider} from './ngredux';
//const provider = require('ng2-redux').provider;
const store = configureStore();
declare let __PRODUCTION__: any;

if (__PRODUCTION__) {
  enableProdMode();
}

export function providers<T>(store: any) {
  const _connector = { connect: () => {} };
  const factory = () => {
    // TS doesn't seem to like this with ...spread :(
    return {
      connect: _connector.connect,
      dispatch: store.dispatch,
      subscribe: store.subscribe,
      getState: store.getState,
      replaceReducer: store.replaceReducer
    }
  };

  return provide('x', {useFactory: factory });
}
const ngRedux =  provider(store);

bootstrap(App,
  [
  provide('test',{useFactory: ()=> x => { return x }),
 ngRedux,
  ROUTER_PROVIDERS,
  providers<any>({dispatch: '', subscribe: '', getState: '', replaceReducer: ''}),
  provide(APP_BASE_HREF, { useValue: '/' })
]);
