import {RuntimeEnv} from '~/src/website/types/environment';
import {runtimeEnv} from '~/src/website/utils/env';

const changeRuntimeEnv = (env: RuntimeEnv): RuntimeEnv => (process.env.RUNTIME_ENV = env);

describe('runtime environment function utils', () => {
  const OLD_PROCESS_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = {...OLD_PROCESS_ENV};
  });

  it('run in development env', () => {
    changeRuntimeEnv(RuntimeEnv.DEVELOPMENT);

    expect(runtimeEnv({DEVELOPMENT: 1})).toBe(1);
  });

  it('run in staging env', () => {
    changeRuntimeEnv(RuntimeEnv.STAGING);

    expect(runtimeEnv({STAGING: 1})).toBe(1);
  });

  it('run in production env', () => {
    changeRuntimeEnv(RuntimeEnv.PRODUCTION);

    expect(runtimeEnv({PRODUCTION: 1})).toBe(1);
  });
});
