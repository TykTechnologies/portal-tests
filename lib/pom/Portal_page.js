const Page = require('./Page');
const Button_object = require('ui_test_automation/wrappers/Button_object');

class Portal_page extends Page {
    get USER_BUTTON() {return new Button_object('.tykon-profile');}
    get LOGOUT_BUTTON() {return new Button_object('a*=Log out');}
    get LOG_IN_BUTTON() {return new Button_object('a*=Log in');}
    get REGISTER_BUTTON() {return new Button_object('a*=Register');}

    checkIfPageIsOpened() {wdioExpect(this.SECTION_TITLE_TEXT).toBeDisplayed();}

    logOut() { 
        this.USER_BUTTON.click();
        this.LOGOUT_BUTTON.click();
        console.log("User was logged out");
    }
}
export const portal_page = new Portal_page();