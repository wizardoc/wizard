export enum RuntimeEnv {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

export type IRuntimeEnv = typeof RuntimeEnv;

export interface CustomProcessEnv {
  RUNTIME_ENV: IRuntimeEnv[keyof IRuntimeEnv];
}
