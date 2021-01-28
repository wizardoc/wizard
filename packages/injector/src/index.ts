import {Injector} from './injector';

export * from './injector';

export const injector = new Injector();

export const {Injectable, peek, collect, extract, Inject} = injector;
