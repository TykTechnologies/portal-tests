import { login_page } from '../../../lib/pom/Login_page';
import { admin_page } from '../../../lib/pom/Admin_page';
import { users_page } from '../../../lib/pom/Users_page';
import { main_page } from '../../../lib/pom/Main_page';

describe('Create simple API', () => {
  const userDetails = {
    first: "test_first_name",
    last: "test_second_name",
    email: "test_email@tyk.io",
    password: "test123",
    role: "test_role",
    isActive: true
  };

  before(() => {
    login_page.open();
    login_page.login();
  });

  it('Admin should be able to create a user', () => {
    admin_page.USERS_BUTTON.click();
    users_page.PLUS_BUTTON.click();
    users_page.fillNewUserForm(userDetails);
    users_page.ADD_BUTTON.click();
    browser.debug()
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