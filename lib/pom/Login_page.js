const Page = require('./Page');
const Button_object = require('ui_test_automation/wrappers/Button_object');
import { URL, LOGIN_PATH, USER_EMAIL, USER_PASSWORD } from '../../config_variables';

class Login_page extends Page {
    
    get USERNAME_INPUT() {return $('input[name="username"]');}
    get PASSWORD_INPUT() {return $('input[name="password"]');}
    get LOGIN_BUTTON() {return $('input[type="submit"]');}
    
    open() {
        super.open(URL + LOGIN_PATH);
     }

     login(userName = USER_EMAIL, password = USER_PASSWORD) {
        console.debug(`Login as ${userName} and pass: ${password}`);
        this.USERNAME_INPUT.setValue(userName);
        this.PASSWORD_INPUT.setValue(password);
    
        this.LOGIN_BUTTON.click();
      }
}
export const login_page = new Login_page();