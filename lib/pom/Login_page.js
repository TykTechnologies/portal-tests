const Page = require('./Page');
const Button_object = require('ui_test_automation/wrappers/Button_object');
import { URL, LOGIN_PATH, USER_EMAIL, USER_PASSWORD, DEV_EMAIL, DEV_A1_EMAIL, DEV_A_EMAIL, DEV_PASS, DEV_B1_EMAIL } from '../../config_variables';

class Login_page extends Page {
    
    get USERNAME_INPUT() {return $('input[name="username"]');}
    get PASSWORD_INPUT() {return $('input[name="password"]');}
    get LOGIN_BUTTON() {return $('input[type="submit"]');}
    
    open() {
        super.open(URL + LOGIN_PATH);
     }

     loginAsDev(){
       this.login(DEV_EMAIL, DEV_PASS);
     }

     loginAsDevA(){
      this.login(DEV_A_EMAIL, DEV_PASS);
    }

    loginAsDevA1(){
      this.login(DEV_A_EMAIL, DEV_PASS);
    }

    loginAsDevB(){
      this.login(DEV_B1_EMAIL, DEV_PASS);
    }

     login(userName = USER_EMAIL, password = USER_PASSWORD) {
        console.debug(`Login as ${userName} and pass: ${password}`);
        this.USERNAME_INPUT.setValue(userName);
        this.PASSWORD_INPUT.setValue(password);
    
        this.LOGIN_BUTTON.click();
      }
}
export const login_page = new Login_page();