import { login_page } from '../../lib/pom/Login_page';
import { portal_page } from '../../lib/pom/Portal_page';
import { GW_connection } from '../../lib/GW_connection';
import { PUBLIC_API_NAME, FREE_PLAN_RATE_LIMIT } from '../../config_variables';
import { dev_apps_page } from '../../lib/pom/Dev_apps_page';

module.exports = (appName) => {
  let approved_request_object;
  let token, rotatedToken;
  
  describe('Token limits in GW', () => {
    const gw_connection = new GW_connection();
    before(() => {
      login_page.open();
      login_page.loginAsDevA1();
    });

    it('Developer should see approved provisioning requet', () => {
      browser.refresh();
      portal_page.openMyApps();
      dev_apps_page.APPS_TABLE.clickCellWithText(appName);
      dev_apps_page.expectCountOfApprovedRequests(1);
      approved_request_object = dev_apps_page.getAllApprovedRequests()[0];
      approved_request_object.expectApprovedState();
    });

    it('Developer can use token within the rate limits', () => {
      token = approved_request_object.getToken();
      expect(token).to.not.be.empty;
      for (let requestNumber = 1; requestNumber <= FREE_PLAN_RATE_LIMIT; requestNumber++) {
        console.log(`>>> request number ${requestNumber}`);
        gw_connection.expectTokenWorksWithGW(PUBLIC_API_NAME, token);
      }
    });

    it('Developer hits rate limits', () => {
      const response = gw_connection.sendGetRequestWithToken(PUBLIC_API_NAME, token);
      expect(response.statusCode).to.equal(429);
    });

    it('Developer is able to rotate token after hitting the rate limits', () => {
      approved_request_object.ROTATE_BUTTON.click();
      dev_apps_page.POPUP_ROTATE_BUTTON.click();
      rotatedToken = approved_request_object.getToken();
      expect(rotatedToken).to.not.be.empty;
    });

    it('New token works with GW', () => {
      gw_connection.expectTokenWorksWithGW(PUBLIC_API_NAME, rotatedToken);
    });

  });

};