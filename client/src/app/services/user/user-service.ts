import {action, computed, observable} from 'mobx';
import {Inject, Injectable} from 'react-ts-di';

import {BaseInfoData} from '../../components';
import {USER_API} from '../../constant';
// import {TipStore} from '../store';
import {Optional} from '../../types/type-utils';
import {emptyAssert} from '../../utils';
import {HTTP} from '../http';
import {DialogService} from '../dialog-service';
import {JWT} from '../jwt-service';
import { MessageService } from '../message';

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

interface LoginResData {
  jwt: string;
  userInfo: UserBaseInfo;
}

export type ParsedRegisterData = UserBaseInfo & OrganizationInfo;

export type RegisterData = Optional<ParsedRegisterData>;

@Injectable()
export class User {
  @Inject
  private http!: HTTP;

  @Inject
  private jwt!: JWT;

  @Inject
  private dialog!: DialogService;

  @Inject
  messageService!:MessageService

  registerData: RegisterData = {};

  @observable
  userInfo: UserBaseInfo | undefined;

  @observable
  isLogin: boolean = false;

  constructor() {
    if (this.jwt.isExist) {
      // 刷新时带上 JWT 拿到用户的信息
      this.initUserInfo();
    }
  }

  @action
  setUserInfo(userInfo: UserBaseInfo): void {
    this.userInfo = userInfo;
    this.isLogin = true;
  }

  @action
  async initUserInfo(): Promise<void> {
    interface UserInfoDTO {
      userInfo: UserBaseInfo;
    }

    this.dialog.loading(async () => {
      const {data} = await this.http
        .get<UserInfoDTO>(USER_API.INFO)
        .expect(() => '获取用户信息失败');

      emptyAssert(data, data => {
        this.setUserInfo(data.userInfo)
        // initialize websocket
        this.messageService.initWebSocket()
      });
    });
  }

  @action
  async login(username: string, password: string): Promise<boolean> {
    const {data} = await this.http
      .post<LoginResData>(USER_API.LOGIN, {
        username,
        password,
      })
      .expect(() => '登陆失败');

    emptyAssert(data, resData => this.saveToken(resData));

    return !!data
  }

  async validBaseInfo(baseInfo: BaseInfoData): Promise<boolean | undefined> {
    interface ValidResult {
      isValid: boolean;
    }

    const {data} = await this.http
      .post<ValidResult, BaseInfoData>(USER_API.VALID_BASE_INFO, baseInfo)
      .expect(() => '获取验证结果失败');

    return data?.isValid;
  }

  @computed
  get getIsLogin(): boolean {
    return this.isLogin;
  }

  @computed
  get avatar(): string {
    if (!this.userInfo) {
      return '';
    }

    return getAvatar(this.userInfo);
  }

  async register(): Promise<void> {
    const {data} = await this.http.post<LoginResData>(USER_API.REGISTER, this.registerData).expect(() => "注册失败")

    emptyAssert(data, data => this.saveToken(data))
  }

  collectBaseInfo(baseInfo: BaseInfoData): void {
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

  logout(): void {
    this.jwt.remove();

    // reset userData
    this.userInfo = undefined;
    this.isLogin = false;
  }

  async updateAvatar(avatar: string): Promise<void> {
    await this.http.put(USER_API.updateAvatar, {avatar}).expect(() => "更新头像失败");

    this.userInfo!.avatar = avatar;
  }

  private saveToken({jwt, userInfo}: LoginResData): void {
    this.jwt.save(jwt);
    this.setUserInfo(userInfo);
  }
}

interface UserInfoAvatarPart {
  avatar: string;
  displayName: string;
}

export function getAvatar(userInfo: UserInfoAvatarPart): string {
  if (!userInfo) {
    return '';
  }

  const {avatar, displayName} = userInfo;

  return avatar === '' || !avatar ? displayName[0] : avatar;
}
