import { login_page } from '../../../lib/pom/Login_page';
import { admin_page } from '../../../lib/pom/Admin_page';
import { api_consumers_page } from '../../../lib/pom/Api_consumers_page';
import { registration_page } from '../../../lib/pom/Registration_page';
import { Email_server_connection } from '../../../lib/email/Email_server_connection';
import { uuid } from 'uuidv4';
import { DEV_PASS, INVITE_EMAIL_SUBJECT, EMAIL_DEFAULT_FROM_ADDRESS } from '../../../config_variables';

describe('Inviting new API consumer', () => {
    const emailServerConnection = new Email_server_connection();
    const userDetails = {
        first: "invite_first_name",
        last: "invite_second_name",
        email: `invite_developer_${uuid()}@tyk.io`,
        org: "Default Organisation"
    };
    let inviteEmailInfo;

    before(() => {
        login_page.open();
        login_page.login();
        emailServerConnection.deleteAllMessages();
    });

    it('Admin should be able to create a developer', () => {
        admin_page.API_CONSUMERS_BUTTON.click();
        api_consumers_page.ADD_BUTTON.click();
        api_consumers_page.fillNewUserForm(userDetails);
        api_consumers_page.SAVE_BUTTON.click();
    });

    it('Admin is able to send invite developer', () => {
        api_consumers_page.TABLE.clickCellWithText(userDetails.email);
        api_consumers_page.SEND_INVITE_BUTTON.click();
        api_consumers_page.OK_BUTTON.click();
        wdioExpect(api_consumers_page.INVITE_SEND_SUCCESS_ALERT).toBeDisplayed();
    });

    it('Developer received an invite email', () => {
        inviteEmailInfo = emailServerConnection.getLastEmailFromServer();
        console.log(`Email message: ${JSON.stringify(inviteEmailInfo)}`);
        expect(inviteEmailInfo.subject).equal(INVITE_EMAIL_SUBJECT);
        expect(inviteEmailInfo.to).equal(userDetails.email);
        expect(inviteEmailInfo.from).equal(EMAIL_DEFAULT_FROM_ADDRESS);
    });

    it('Developer is able to use an invite form to activate the account', () => {
        browser.url(inviteEmailInfo.link);
        registration_page.PASSWORD_INPUT.setValue(DEV_PASS);
        registration_page.CONFIRM_PASSWORD_INPUT.setValue(DEV_PASS);
        registration_page.RESET_BUTTON.click();
        $('a=login').click();
        login_page.login(userDetails.email, DEV_PASS);
        wdioExpect($(`a*=${userDetails.first} ${userDetails.last}`)).toBeDisplayed();
    });
});