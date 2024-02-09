import { Injectable } from '@angular/core';

@Injectable()
export class ServiceConfigs {

    private CONFIG_KEYS: any = {
        REQ_TYPE_GET: 'get',
        REQ_TYPE_POST: 'post',
        REQ_TYPE_DELETE: 'delete',
        MOCK_DIR: 'assets/data/',
    }

    public AUTH_LOGIN_SERVICES_CONFIG: any = {

        AT_LOGIN: {
          url: 'api/login',
          mockUrl: this.CONFIG_KEYS.MOCK_DIR + 'auth/login.json',
          reqType: this.CONFIG_KEYS.REQ_TYPE_POST,
          isMock: false
        },
        
        FORGOT_PASSWORD: {
          url: 'api/forgotPassword',
          mockUrl: this.CONFIG_KEYS.MOCK_DIR + 'common/forgotPassword/forgotPassword.json',
          reqType: this.CONFIG_KEYS.REQ_TYPE_POST
        },
        OTP_VERIFICATION: {
          url: this.CONFIG_KEYS.SERVICE_REST_URI + 'password/validateOtp',
          mockUrl: this.CONFIG_KEYS.MOCK_DIR + 'common/token.json',
          reqType: this.CONFIG_KEYS.REQ_TYPE_POST,
          isMock: false
        },
        EMAIL_VERIFICATION: {
          url: this.CONFIG_KEYS.SERVICE_REST_URI + 'password/forgotPassword',
          mockUrl: this.CONFIG_KEYS.MOCK_DIR + 'common/token.json',
          reqType: this.CONFIG_KEYS.REQ_TYPE_GET,
          isMock: false
        },
        RESET_PASSWORD: {
          url: this.CONFIG_KEYS.SERVICE_REST_URI + 'password/resetPassword',
          mockUrl: this.CONFIG_KEYS.MOCK_DIR + 'country.json',
          reqType: this.CONFIG_KEYS.REQ_TYPE_POST
        },
        RESEND_OTP: {
          url: this.CONFIG_KEYS.SERVICE_REST_URI + 'password/resendOtp',
          mockUrl: this.CONFIG_KEYS.MOCK_DIR + 'common/token.json',
          reqType: this.CONFIG_KEYS.REQ_TYPE_POST,
          isMock: false
        },
      };

}