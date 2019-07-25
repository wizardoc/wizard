import {action, computed, observable, runInAction} from 'mobx';
import {Inject, Injectable} from 'react-ts-di';

import {HTTP} from '../api';
import {USER_API} from '../constant';
// import {TipStore} from '../store';
import {Optional} from '../types/type-utils';
import {LocalStorage} from '../utils';

export interface UserBaseInfo {
  displayName: string;
  username: string;
  password: string;
  email: string;
  avatar: string;
}

interface OrganizationInfo {
  organizationName: string;
  organizationDescription?: string;
}

type ParsedRegisterData = UserBaseInfo & OrganizationInfo;

type RegisterData = Optional<ParsedRegisterData>;

// const REGISTER_COMPLETION_ERROR_MESSAGE = '请确保信息填写是否完整';

@Injectable()
export class User {
  // @InjectStore(TipStore)
  // private tipStore!: TipStore;

  @Inject
  private http!: HTTP;

  private registerData: RegisterData = {};

  @observable
  userInfo: UserBaseInfo | undefined;
  // private username: string | undefined;
  // private role: string | undefined;
  // private company: string | undefined;

  @observable
  isLogin: boolean = false;

  @action
  async login(username: string, password: string): Promise<void> {
    const {jwt, userInfo} = await this.http.post(USER_API.LOGIN, {
      username,
      password,
    });

    LocalStorage.setItem('jwt', jwt);

    runInAction(() => {
      console.info(this.isLogin);

      this.userInfo = userInfo;
      this.isLogin = true;
    });
  }

  async register(): Promise<void> {
    // if (this.checkInfoBeforeRegister()) {
    //   this.tipStore.addTipToQueue(REGISTER_COMPLETION_ERROR_MESSAGE, 'error');

    //   return;
    // }

    return this.http.post(USER_API.REGISTER, {
      displayName: 'Younccat',
      username: 'zzhbbdbbd',
      password: 'zzh1997422',
      email: 'zzhbbdbbd@163.com',
      organizationName: 'wizard',
    });
  }

  collectBaseInfo(baseInfo: UserBaseInfo): void {
    this.registerData = {...this.registerData, ...baseInfo};
  }

  ensureOrganization(
    organizationName: string,
    organizationDescription?: string,
  ): void {
    this.registerData = {
      ...this.registerData,
      organizationName,
      organizationDescription,
    };
  }

  @computed
  get getIsLogin(): boolean {
    console.info(this.isLogin);
    return this.isLogin;
  }

  //   for (const key of this.registerData as Iterable<string>) {
  //     if (!key) {
  //       return false;
  //     }
  //   }

  //   return true;
  // }
}

export const userService = new User();
