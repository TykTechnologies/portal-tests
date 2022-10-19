import { login_page } from '../../../lib/pom/Login_page';
import { portal_page } from '../../../lib/pom/Portal_page';
import { admin_page } from '../../../lib/pom/Admin_page';
import { general_settings_page } from '../../../lib/pom/General_settings_page';
import { main_page } from '../../../lib/pom/Main_page';
import { DEV_PASS } from '../../../config_variables';
import { api_consumers_page } from '../../../lib/pom/Api_consumers_page';
import { registration_page } from '../../../lib/pom/Registration_page';

describe('Dev access tests', () => {
    const devUserDetails = {
        email: "test_access@tyk.io",
        first: "test_access",
        last: "test_access",
        password: DEV_PASS,
    };

    before(() => {
        login_page.open();
        login_page.login();
      });

    it('Admin can disable sign-in to portal', () => {
        admin_page.GENERAL_BUTTON.click();
        general_settings_page.ENABLE_SIGN_IN_CHECKBOX.click(); //disabling sign-in
        general_settings_page.SAVE_CHANGES_BUTTON.click();
        wdioExpect(general_settings_page.SUCCESS_MESSAGE_ALERT).toBeDisplayed();
        admin_page.logOut();
    });

    it("Developer can't signin when signin is disabled", () => {
        login_page.open();
        login_page.loginAsDev();
        wdioExpect(portal_page.LOGIN_IS_DISABLED_LABEL).toBeDisplayed();
        wdioExpect(portal_page.LOG_IN_BUTTON).toBeDisplayed();
    });

    it("Admin can disable Registration to Portal", () => {
        portal_page.LOG_IN_BUTTON.click();
        login_page.login();
        admin_page.GENERAL_BUTTON.click();
        general_settings_page.ENABLE_REGISTER_CHECKBOX.click(); //disabling registration
        general_settings_page.SAVE_CHANGES_BUTTON.click();
        wdioExpect(general_settings_page.SUCCESS_MESSAGE_ALERT).toBeDisplayed();
        admin_page.logOut();
    });

    it("User can not register to Portal when registering is disabled", () => {
        portal_page.REGISTER_BUTTON.click();
        wdioExpect(portal_page.REGISTARTION_IS_NOT_ALLOWED_LABEL).toBeDisplayed();
    });

    it("Admin can disable auto-approve on registration", () => {
        portal_page.LOG_IN_BUTTON.click();
        login_page.login();
        admin_page.GENERAL_BUTTON.click();
        general_settings_page.ENABLE_AUTOAPPROVE_REGISTER_CHECKBOX.click(); //disabling auto-approve
        browser.pause(1000);
        general_settings_page.ENABLE_SIGN_IN_CHECKBOX.click(); //enabling sign-in
        browser.pause(1000);
        general_settings_page.ENABLE_REGISTER_CHECKBOX.click(); //enabling registration
        general_settings_page.SAVE_CHANGES_BUTTON.click();
        wdioExpect(general_settings_page.SUCCESS_MESSAGE_ALERT).toBeDisplayed();
        admin_page.logOut();
    });

    it('Registering user - request has been sent', () => {
        main_page.REGISTER_BUTTON.click();
        registration_page.fillForm(devUserDetails);
        registration_page.REGISTER_BUTTON.click();
        wdioExpect(portal_page.REGISTARTION_REQUEST_HAS_BEEN_SENT_LABEL).toBeDisplayed();
    });
    
    it('Admin is able to approve the registration request', () => {
        portal_page.LOG_IN_BUTTON.click();
        login_page.login();
        admin_page.API_CONSUMERS_BUTTON.click();
        api_consumers_page.approveRequestWithEmail(devUserDetails.email);
        admin_page.logOut();
    });

    it("Developer is able to login", () => {
        login_page.open();
        login_page.login(devUserDetails.email);
        wdioExpect(portal_page.USER_BUTTON).toBeDisplayed();
    });
});