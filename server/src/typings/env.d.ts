declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_PORT: string;
    }
  }
}

export {};
