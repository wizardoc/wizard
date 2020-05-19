import {Injector} from './injector';

export * from './injector';

const injector = new Injector();

export const {Injectable, collect, extract, Inject} = injector;
