import { login_page } from '../../../lib/pom/Login_page';
import { admin_page } from '../../../lib/pom/Admin_page';
import { api_consumers_page } from '../../../lib/pom/Api_consumers_page';

describe('Creating new developer', () => {
    const userDetails = {
        first: "test_first_name",
        update_first: "update_first",
        last: "test_second_name",
        email: "api_consumer_email@tyk.io",
        org: "Default Organisation"
    };

    before(() => {
        login_page.open();
        login_page.login();
    });

    it('Admin should be able to create a developer', () => {
        admin_page.API_CONSUMERS_BUTTON.click();
        api_consumers_page.ADD_BUTTON.click();
        api_consumers_page.fillNewUserForm(userDetails);
        browser.pause(2000);
        api_consumers_page.SAVE_BUTTON.click();
    });

    it('New user is visible in the user table', () => {
        wdioExpect($(`div=${userDetails.email}`)).toBeDisplayed();
    });

    it('Admin should be able to update a developer', () => {
        api_consumers_page.TABLE.clickCellWithText(userDetails.email);
        api_consumers_page.FIRST_NAME_INPUT.setValue(userDetails.update_first);
        api_consumers_page.SAVE_CHANGES_BUTTON.click();
        wdioExpect($(`div=${userDetails.update_first} ${userDetails.last}`)).toBeDisplayed();
    });

    it('Admin is able to delete the new developer', () => {
        const rowNumber = api_consumers_page.TABLE.getRowNumberOfCellWithValue(`${userDetails.update_first} ${userDetails.last}`);
        api_consumers_page.TABLE.deleteRow(rowNumber);
        wdioExpect($(`div=${userDetails.update_first} ${userDetails.last}`)).not.toBeDisplayed();
    });

});