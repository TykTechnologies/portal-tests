import { login_page } from '../../../lib/pom/Login_page';
import { main_page } from '../../../lib/pom/Main_page';
import { registration_page } from '../../../lib/pom/Registration_page';
import { DEV_EMAIL, DEV_PASS } from '../../../config_variables';

describe('Portal vibility', () => {
    const devUserDetails = {
        email: DEV_EMAIL,
        first: "dev",
        last: "test",
        password: DEV_PASS,
    };

    before(() => {
        login_page.open();
      });

    it('Registering user', () => {
        main_page.REGISTER_BUTTON.click();
        registration_page.fillForm(devUserDetails);
        registration_page.REGISTER_BUTTON.click();
        wdioExpect(main_page.REGISTRATION_SUCCESS_LABEL).toBeDisplayed();
    });  
});