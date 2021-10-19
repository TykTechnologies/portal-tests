const Page = require('./Page');
const Button_object = require('ui_test_automation/wrappers/Button_object');
import { URL, LOGIN_PATH } from '../../config_variables';

class Registration_page extends Page {
    
    get EMAIL_INPUT() {return $('input[name="email"]');}
    get FIRST_INPUT() {return $('input[name="first"]');}
    get LAST_INPUT() {return $('input[name="last"]');}
    get PASSWORD_INPUT() {return $('input[name="password1"]');}
    get CONFIRM_PASSWORD_INPUT() {return $('input[name="password2"]');}
    get INVITE_CODE_INPUT() {return $('input[name="invite_id"]');}
    get REGISTER_BUTTON() {return new Button_object('input[type="submit"]');}
    
    open() {
        super.open(URL + LOGIN_PATH);
     }

    fillForm(registrationDetails) {
      console.log(`Filling the form with values: ` + registrationDetails);
      this.EMAIL_INPUT.setValue(registrationDetails.email);
      this.FIRST_INPUT.setValue(registrationDetails.first);
      this.LAST_INPUT.setValue(registrationDetails.last);
      this.PASSWORD_INPUT.setValue(registrationDetails.password);
      this.CONFIRM_PASSWORD_INPUT.setValue(registrationDetails.password);
      if (registrationDetails.inviteCode !== undefined) {
        this.INVITE_CODE_INPUT.setValue(registrationDetails.inviteCode);
      }
    }
}
export const registration_page = new Registration_page();