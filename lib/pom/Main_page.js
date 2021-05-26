const Page = require('./Page');
const Button_object = require('ui_test_automation/wrappers/Button_object');

class Main_page extends Page {
    get BLOG_BUTTON() {return new Button_object('a*=Blog');}
    get APIS_BUTTON() {return new Button_object('a*=APIs');}
    get LOG_OUT_BUTTON() {return new Button_object('a*=Log out');}
    get LOG_IN_BUTTON() {return new Button_object('a*=Log in');}
    get REGISTER_BUTTON() {return new Button_object('a*=Register');}

    checkIfPageIsOpened() {wdioExpect(this.SECTION_TITLE_TEXT).toBeDisplayed();}
}
export const main_page = new Main_page();