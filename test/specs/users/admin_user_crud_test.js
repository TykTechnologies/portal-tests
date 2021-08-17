import { login_page } from '../../../lib/pom/Login_page';
import { admin_page } from '../../../lib/pom/Admin_page';
import { admin_users_page } from '../../../lib/pom/Admin_users_page';

describe('Creating new users', () => {
    const userDetails = {
        first: "test_first_name",
        update_first: "update_first_name",
        last: "test_second_name",
        email: "test_email@tyk.io",
        // password: "test123",
        // update_password: "test321",
        isActive: true
    };

    before(() => {
        login_page.open();
        login_page.login();
    });

    it('Admin should be able to create a provider-admin', () => {
        admin_page.ADMIN_USERS_BUTTON.click();
        admin_users_page.ADD_BUTTON.click();
        admin_users_page.fillNewUserForm(userDetails);
        admin_users_page.SAVE_BUTTON.click();
    });

    it('New user is visible in the user table', () => {
        wdioExpect($(`div=${userDetails.email}`)).toBeDisplayed();
    });

    it('Admin should be able to update a provider-admin account', () => {
        admin_users_page.TABLE.clickCellWithText(userDetails.email);
        admin_users_page.FIRST_NAME_INPUT.setValue(userDetails.update_first);
        // admin_users_page.PASSWORD_INPUT.setValue(userDetails.update_password);
        admin_users_page.SAVE_CHANGES_BUTTON.click();
        wdioExpect($(`div=${userDetails.update_first}`)).toBeDisplayed();
    });

    it('Admin is able to delete developer', () => {
        admin_users_page.TABLE.deleteRow(1);
        const wasRowDeleted = admin_users_page.TABLE.isCellWithTextNotDisplayed(userDetails.name_update);
        expect(wasRowDeleted).to.be.true;
    });

});