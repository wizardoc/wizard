import type {CustomProcessEnv} from './environment';

declare global {
  namespace NodeJS {
    interface ProcessEnv extends CustomProcessEnv {}
  }
}
