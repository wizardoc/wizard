declare module 'qiniu.js' {
  export function upload(
    file: File,
    key: string,
    token: string,
    putExtra: PutExtra,
    config: UploadConfig,
  ): UploadObservable;

  interface UploadRes {
    total: {
      percent: string;
    };
  }

  export interface UploadObservable {
    subscribe(obj: UploadSubscribeObject): void;
  }

  export interface UploadSubscribeObject {
    next(res: UploadRes): void;
    error(err: Error): void;
    complete(res: UploadRes): void;
  }

  export interface PutExtra<T = object> {
    fname?: string;
    params?: T;
    mimeType?: string[] | null;
  }

  export interface UploadConfig {
    useCdnDomain?: boolean;
  }
}
