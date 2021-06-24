import { login_page } from '../../../lib/pom/Login_page';
import { admin_page } from '../../../lib/pom/Admin_page';
import { users_page } from '../../../lib/pom/Users_page';
import { main_page } from '../../../lib/pom/Main_page';

describe('Creating new users', () => {
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
    users_page.ADD_BUTTON.click();
    users_page.fillNewUserForm(userDetails);
    users_page.SUBMIT_NEW_BUTTON.click();
  });

  it('New user is visible in the user table', () => {
    wdioExpect($(`div=${userDetails.email}`)).toBeDisplayed();
  });
  
});