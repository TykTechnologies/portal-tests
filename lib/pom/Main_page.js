const Page = require('./Page');
const Button_object = require('ui_test_automation/wrappers/Button_object');
const DropDown_object = require('ui_test_automation/wrappers/DropDown_object');
import { URL } from '../../config_variables';

class Main_page extends Page {
    get BLOG_BUTTON() { return new Button_object('a*=Blog'); }
    get CATALOGUES_BUTTON() { return new Button_object('a*=Catalogues'); }
    get LOG_OUT_BUTTON() { return new Button_object('a*=Log out'); }
    get LOG_IN_BUTTON() { return new Button_object('a*=Log in'); }
    get REGISTER_BUTTON() { return new Button_object('a*=Register'); }
    get USER_DROPDOWN() { return new DropDown_object('.dropdown-toggle'); }

    get REGISTRATION_SUCCESS_LABEL() { return $('div*=Your registration was succesful!'); }

    checkIfPageIsOpened() { wdioExpect(this.SECTION_TITLE_TEXT).toBeDisplayed(); }

    open() {
        super.open(URL);
     }
}
export const main_page = new Main_page();