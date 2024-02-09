 export interface UserInfo {
    userID: number;
    siteID: number;
    userName: string;
    password: string;
    emailID: string;
  }
  
  export interface RoleInfo {
    userID: number;
    roleID: number;
    roleName: string;
  }
  
  export interface ResponseData {
    userInfo: UserInfo;
    roleInfo: RoleInfo[];
    accessToken: string;
    successCode: number;
    successMessage: string | null;
    errorCode: string | null;
    errorMessage: string | null;
  }