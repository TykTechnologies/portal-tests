import { main_page } from '../../../lib/pom/Main_page';
import { login_page } from '../../../lib/pom/Login_page';
import { registration_page } from '../../../lib/pom/Registration_page';
import { api_consumers_page } from '../../../lib/pom/Api_consumers_page';
import { admin_page } from '../../../lib/pom/Admin_page';
import { ORG_A_NAME, TEAM_A1_NAME, TEAM_A1_INVITE_CODE } from '../../../config_variables';

describe('Registation with invite code', () => {
   var registrationDetailsWithCode = {
    email: "withCode@tyk.io",
    first: "Roger",
    last: "Waters",
    password: "test123",
    inviteCode: TEAM_A1_INVITE_CODE
  };

  before(() => {
    login_page.open();
  });

  it('User is able to register using invte code', () => {
    main_page.REGISTER_BUTTON.click();
    registration_page.fillForm(registrationDetailsWithCode);
    registration_page.REGISTER_BUTTON.click();
    wdioExpect(main_page.REGISTRATION_SUCCESS_LABEL).toBeDisplayed();
  });

  it('User was assigned to proper team', () => {
    main_page.LOG_IN_BUTTON.click();
    login_page.login();
    admin_page.API_CONSUMERS_BUTTON.click();
    const userRow = api_consumers_page.TABLE.getRowWithValue(registrationDetailsWithCode.email);
    console.log(userRow);
    expect(userRow).to.include(`${ORG_A_NAME} All users, ${TEAM_A1_NAME}`);
  });
});