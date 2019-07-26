import {action, computed, observable} from 'mobx';
import {Inject, Injectable} from 'react-ts-di';

import {HTTP} from '../api';
import {USER_API} from '../constant';
// import {TipStore} from '../store';
import {Optional} from '../types/type-utils';

import {JWT} from './jwt-service';

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
  @computed
  get getIsLogin(): boolean {
    console.info(this.isLogin);
    return this.isLogin;
  }

  @Inject
  private http!: HTTP;
  @Inject
  private jwt!: JWT;

  private registerData: RegisterData = {};

  @observable
  userInfo: UserBaseInfo | undefined;
  // private username: string | undefined;
  // private role: string | undefined;
  // private company: string | undefined;

  @observable
  isLogin: boolean = false;

  constructor() {
    // 刷新时带上 JWT 拿到用户的信息
    this.initUserInfo();
  }
  // @InjectStore(TipStore)
  // private tipStore!: TipStore;

  @action
  setUserInfo(userInfo: UserBaseInfo): void {
    this.userInfo = userInfo;
    this.isLogin = true;
  }

  @action
  async initUserInfo(): Promise<void> {
    try {
      const {userInfo} = await this.http.get(USER_API.INFO);

      this.setUserInfo(userInfo);
    } catch (e) {
      console.error(e);
    }
  }

  @action
  async login(username: string, password: string): Promise<void> {
    const {jwt: jwtString, userInfo} = await this.http.post(USER_API.LOGIN, {
      username,
      password,
    });

    this.jwt.save(jwtString);
    this.setUserInfo(userInfo);
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

  //   for (const key of this.registerData as Iterable<string>) {
  //     if (!key) {
  //       return false;
  //     }
  //   }

  //   return true;
  // }
}
