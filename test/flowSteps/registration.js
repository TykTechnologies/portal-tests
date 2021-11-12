import { main_page } from '../../lib/pom/Main_page';
import { registration_page } from '../../lib/pom/Registration_page';
import { login_page } from '../../lib/pom/Login_page';
import { admin_page } from '../../lib/pom/Admin_page';

describe('Registation without invite code', () => {
  var registrationDetails = {
    email: "withoutInvite@tyk.io",
    first: "Kurt",
    last: "Cobain",
    password: "test123"
  };

  before(() => {
    admin_page.logOut();
    main_page.open();
  });

  it('External user is able to register without invitation code', () => {
    main_page.REGISTER_BUTTON.click();
    registration_page.fillForm(registrationDetails);
    registration_page.REGISTER_BUTTON.click();
    wdioExpect(main_page.REGISTRATION_SUCCESS_LABEL).toBeDisplayed();
   });

  it('User is able to login', () => {
    $('*=GO TO LOGIN').click();
    login_page.login(registrationDetails.email, registrationDetails.password);
    wdioExpect(browser).toHaveUrlContaining("/dashboard");
  });

  it('User can see information about portal beeing disabled', () => {
    wdioExpect($(`a*=${registrationDetails.first} ${registrationDetails.last}`)).toBeDisplayed();  
  });

});