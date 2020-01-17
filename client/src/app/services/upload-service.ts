import {Injectable, Inject} from 'react-ts-di';
import {observable} from 'mobx';
import sha256 from 'crypto-js/sha256';
import {upload, CompletedResult} from 'qiniu-js';

import {HTTP} from '../api';
import {UPLOAD_API} from '../constant';
import {MIME} from '../utils';

import {User} from './user-service';

interface ParsedUploadOptions {
  prefix: string;
  mimeType: string[];
}

interface UploadResult {
  res: CompletedResult;
  url: string;
}

type UploadOptions = Partial<ParsedUploadOptions>;

/**
 * 上传文件 Service，将文件上传到 Qiniu
 * key -> hash(用户名) + prefix(所属的业务场景，比如指定文章，指定组织) + 文件名
 * @author Younccat
 */
@Injectable()
export class UploadService {
  @Inject
  private httpService!: HTTP;

  @Inject
  private userService!: User;

  /** 上传进度 */
  @observable
  private _percent: number = 0;

  private _token: string = '';

  private domain = 'q47dmxl45.bkt.clouddn.com';

  constructor() {
    this.getQiniuToken();
  }

  upload(file: File, options?: UploadOptions): Promise<UploadResult> {
    const {prefix, mimeType} = this.parseOptions(options || {});
    const key = this.genKey(file.name, prefix);

    return new Promise((resolve, reject) => {
      if (!key) {
        reject(new Error('permission denied'));

        return;
      }

      const observable = upload(
        file,
        key,
        this.token,
        {
          mimeType,
        },
        {
          useCdnDomain: true,
        },
      );

      observable.subscribe({
        next: res => (this._percent = res.total.percent),
        error: err => reject(err),
        complete: res => resolve({res, url: this.getUrl(key)}),
      });
    });
  }

  getUrl(key: string): string {
    return `http://${this.domain}/${key}`;
  }

  /**
   *  pre parse options and attach default value
   */
  private parseOptions(options: UploadOptions): ParsedUploadOptions {
    return {
      mimeType: [MIME.PNG, MIME.JPEG, MIME.JPG],
      prefix: '',
      ...options,
    };
  }

  /**
   * generate key for upload
   */
  private genKey(filename: string, prefix: string): string | undefined {
    const userInfo = this.userService.userInfo;

    if (!userInfo) {
      return undefined;
    }

    return `${sha256(userInfo.username)}${prefix}${filename}`;
  }

  private async getQiniuToken(): Promise<void> {
    this._token = await this.httpService.get(UPLOAD_API.getToken);
  }

  get percent(): number {
    return this._percent;
  }

  get token(): string {
    return this._token;
  }
}
