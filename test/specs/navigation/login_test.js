import { login_page } from '../../../lib/pom/Login_page';
import { admin_page } from '../../../lib/pom/Admin_page';
import { main_page } from '../../../lib/pom/Main_page';

describe('Login/logout check', () => {

    before(() => {
        login_page.open();
    });

    it('User should be able to login using admin credentials', () => {
        login_page.login();
        admin_page.checkIfPageIsOpened();
    });

    it('Main Admin page should be displayed after login', () => {
        wdioExpect(admin_page.SECTION_TITLE_TEXT).toHaveText("Admin");
    });

    it('Admin is able to open dashboard', () => {
        admin_page.openDashboard();
        wdioExpect(main_page.APIS_BUTTON).toBeDisplayed();
    });

    it('Admin is able to logout', () => {
        browser.pause(1000);
        main_page.USER_PROFILE_DROPDOWN.click()
        main_page.LOG_OUT_BUTTON.click();
        wdioExpect(main_page.LOG_IN_BUTTON).toBeDisplayed();
        wdioExpect(main_page.REGISTER_BUTTON).toBeDisplayed();
    });

    it('Users stays logout after refresh', () => {
        browser.refresh();
        wdioExpect(main_page.REGISTER_BUTTON).toBeDisplayed();
        wdioExpect(main_page.LOG_IN_BUTTON).toBeDisplayed();
    });
});