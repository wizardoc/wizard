import {AxiosError} from 'axios';

export type PipeFunction = (value: unknown) => unknown;

// The operator function allows u to defined ur own operator on result of request
// and u can pass some args that exist in http-client context as parameters
export type OperatorFunction = (pipeFn: PipeFunction, ...args: unknown[]) => unknown;

export type Operator = (value: unknown, err: AxiosError) => OperatorFunction;
