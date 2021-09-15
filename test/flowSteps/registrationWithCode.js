import { main_page } from '../../lib/pom/Main_page';
import { login_page } from '../../lib/pom/Login_page';
import { registration_page } from '../../lib/pom/Registration_page';
import { api_consumers_page } from '../../lib/pom/Api_consumers_page';
import { admin_page } from '../../lib/pom/Admin_page';

//to make it possible to run without prerequisits executed in the same thread
const prerequisitsData = global.prerequisitsData || {orgName: "inviteTestOrg", teamName: "inviteTestTeam", inviteCode: "1fd1bac8636d4c14836e39c23538e49d"};

describe('Registation with invite code', () => {
  var registrationDetailsWithCode = {
    email: "withCode@tyk.io",
    first: "Roger",
    last: "Waters",
    password: "test123",
  };

  before(() => {
    admin_page.logOut();
    login_page.open();
    registrationDetailsWithCode.inviteCode = global.prerequisitsData.inviteCode;
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
    expect(userRow).to.include(`${prerequisitsData.orgName} All users, ${prerequisitsData.teamName}`);
  });
});