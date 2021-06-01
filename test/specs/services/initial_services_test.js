import { login_page } from '../../../lib/pom/Login_page';
import { admin_page } from '../../../lib/pom/Admin_page';

xdescribe('Service was loaded on the bootstraping', () => {
  const serviceName = 'raava service 1';

  before(() => {
    login_page.open();
    login_page.login();
  });

  it('Admin should be able to see service that was loaded on bootstraping', () => {
    admin_page.SERVICES_BUTTON.click();
    wdioExpect($(`div=${serviceName}`)).toBeDisplayed();
  });
  
});