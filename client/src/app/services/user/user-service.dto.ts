export interface UserModel {
  id: string;
  avatar: string;
  loginTime: number;
  email: string;
  displayName: string;
  registerTime: number;
  username: string;
}

export interface UserInfoDTO {
  userInfo: UserBaseInfo;
}

export interface UserBaseInfo {
  displayName: string;
  username: string;
  password: string;
  email: string;
  avatar: string;
}

export interface ValidResult {
  isValid: boolean;
}
