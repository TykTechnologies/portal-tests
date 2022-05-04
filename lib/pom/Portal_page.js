const Page = require('./Page');
const Button_object = require('ui_test_automation/wrappers/Button_object');
const DropDown_object = require('ui_test_automation/wrappers/DropDown_object');

class Portal_page extends Page {
    get USER_BUTTON() { return new DropDown_object('.dropdown-toggle'); }
    get LOGOUT_BUTTON() { return new Button_object('a*=Log out'); }
    get MY_APPS_BUTTON() { return new Button_object('a*=My Apps'); }
    get LOG_IN_BUTTON() { return new Button_object('a*=Log in'); }
    get REGISTER_BUTTON() { return new Button_object('a*=Register'); }

    get LOGIN_IS_DISABLED_LABEL() { return $('div*=Login is disabled'); }
    get REGISTARTION_IS_NOT_ALLOWED_LABEL() { return $('div*=Registration is not allowed'); }
    get REGISTARTION_REQUEST_HAS_BEEN_SENT_LABEL() { return $('div*=The registration request has been sent, you’ll recieve an email once it’s been approved.'); }

    checkIfPageIsOpened() { wdioExpect(this.SECTION_TITLE_TEXT).toBeDisplayed(); }

    openMyApps() {
        const $addAppButton = $('span*=Create new App');
        this.USER_BUTTON.click();
        browser.pause(2000);
        this.MY_APPS_BUTTON.click();
        if ($addAppButton.isDisplayed()) {
            console.log(`>>> myApps page was opened successfully`);
            return;
        }
        console.log(`>>> myApps page was not opened. Performing refresh!`);
        this.USER_BUTTON.click();
        browser.pause(2000);
        this.MY_APPS_BUTTON.click();
        $addAppButton.waitForDisplayed(`myApps Page was not opened!`);
    }

    logOut() {
        this.USER_BUTTON.click();
        this.LOGOUT_BUTTON.click();
        this.REGISTER_BUTTON.waitForDisplayed();
        console.log("User was logged out");
    }
}
export const portal_page = new Portal_page();