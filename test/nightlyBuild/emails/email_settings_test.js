import { login_page } from '../../../lib/pom/Login_page';
import { admin_page } from '../../../lib/pom/Admin_page';
import { general_settings_page } from '../../../lib/pom/General_settings_page';
const config = require('../../../config_variables');

describe('Email admin settings', () => {

    before(() => {
        login_page.open();
        login_page.login();
    });

    it('Admin should be able to save email settings', () => {
        admin_page.GENERAL_BUTTON.click();
        general_settings_page.EMAIL_FROM_ADDRESS_INPUT.setValue(config.EMAIL_FROM_ADDRESS);
        general_settings_page.EMAIL_DEFAULT_FROM_ADDRESS_INPUT.setValue(config.EMAIL_DEFAULT_FROM_ADDRESS);
        general_settings_page.RESET_EMAIL_SUBJECT_INPUT.setValue(config.RESET_EMAIL_SUBJECT);
        general_settings_page.APPROVE_EMAIL_SUBJECT_INPUT.setValue(config.APPROVE_EMAIL_SUBJECT);
        general_settings_page.REJECT_EMAIL_SUBJECT_INPUT.setValue(config.REJECT_EMAIL_SUBJECT);
        general_settings_page.REGISTER_EMAIL_SUBJECT_INPUT.setValue(config.REGISTER_EMAIL_SUBJECT);
        general_settings_page.INVITE_EMAIL_SUBJECT_INPUT.setValue(config.INVITE_EMAIL_SUBJECT);
        general_settings_page.SMTP_HOST_INPUT.setValue(config.SMTP_HOST);
        general_settings_page.SMTP_PORT_INPUT.setValue(config.SMTP_PORT);
        general_settings_page.SMTP_USER_INPUT.setValue(config.SMTP_USER);
        general_settings_page.SMTP_PASS_INPUT.setValue(config.SMTP_PASS);
        general_settings_page.SAVE_CHANGES_BUTTON.click();
        wdioExpect(general_settings_page.SUCCESS_MESSAGE_ALERT).toBeDisplayed();
    });

    it('Settings were saved', () => {
        browser.refresh();
        wdioExpect(general_settings_page.SMTP_PORT_INPUT).toHaveValue(config.SMTP_PORT);
    });
});