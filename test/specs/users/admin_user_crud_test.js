import { login_page } from '../../../lib/pom/Login_page';
import { admin_page } from '../../../lib/pom/Admin_page';
import { admin_users_page } from '../../../lib/pom/Admin_users_page';

describe('Creating new users', () => {
    const userDetails = {
        first: "test_first_name",
        update_first: "update_first_name",
        last: "test_second_name",
        email: "test_email@tyk.io",
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
        admin_users_page.SAVE_CHANGES_BUTTON.click();
        wdioExpect($(`div=${userDetails.update_first} ${userDetails.last}`)).toBeDisplayed();
    });

    it('Admin is able to delete the new admin user', () => {
        const rowNumber = admin_users_page.TABLE.getRowNumberOfCellWithValue(`${userDetails.update_first} ${userDetails.last}`);
        admin_users_page.TABLE.deleteRow(rowNumber);
        wdioExpect($(`div=${userDetails.update_first} ${userDetails.last}`)).not.toBeDisplayed();
    });

});