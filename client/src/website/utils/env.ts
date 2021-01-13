import type {IRuntimeEnv} from '../types/environment';

export type CrossEnvOptions<T> = {
  [K in keyof IRuntimeEnv]: T;
};

export const runtimeEnv = <T>(options: Partial<CrossEnvOptions<T>>): never | T => {
  // U can via process.env.[ENV_NAME] to get the env variable that u want but
  // u can't access process.env directly for security reason
  // see https://github.com/parcel-bundler/parcel/issues/2299#issuecomment-439768971 for more detail
  const target = Object.keys(options).reduce(
    (res, cur) =>
      process.env.RUNTIME_ENV.toLowerCase() === cur.toLowerCase() ? options[cur] : res,
    undefined,
  );

  if (!target) {
    throw new Error(`
      Cannot hit current runtime environment, please check input environment.

      Current runtime environment: ${process.env.RUNTIME_ENV}.
    `);
  }

  return target;
};
