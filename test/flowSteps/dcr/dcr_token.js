import { login_page } from '../../../lib/pom/Login_page';
import { portal_page } from '../../../lib/pom/Portal_page';
import { GW_connection } from '../../../lib/GW_connection';
import { Keycloak_connection } from '../../../lib/Keycloak_connection';
import { CUSTOM_API_TEAM_D_NAME } from '../../../config_variables';
import { dev_apps_page } from '../../../lib/pom/Dev_apps_page';

module.exports = (appName) => {
  let approved_request_object;
  let clientID, clientSecret, tokenFromKeycloak;
  
  describe('DCR credentials usage', () => {
    const gw_connection = new GW_connection();
    const keycloak_connection = new Keycloak_connection();
    before(() => {
      login_page.open();
      login_page.loginAsDevD();
    });

    it('Developer should see approved DCR provisioning request', () => {
      portal_page.openMyApps();
      dev_apps_page.APPS_TABLE.clickCellWithText(appName);
      dev_apps_page.APPROVED_ACCESS_BUTTON.click();
      dev_apps_page.expectCountOfApprovedRequests(1);
      approved_request_object = dev_apps_page.getAllApprovedRequests()[0];
      approved_request_object.expectApprovedState();
    });

    it('Developer should see Client ID and Secret', () => {
      clientID = approved_request_object.getClientID();
      clientSecret = approved_request_object.getClientSecret();
      expect(clientID).to.not.be.empty;
      expect(clientSecret).to.not.be.empty;
    });

    it('Developer is able to get token from Keycloak', () => {
        tokenFromKeycloak = keycloak_connection.getToken(clientID, clientSecret);
        expect(tokenFromKeycloak).to.not.be.empty;
    });

    it('Developer is able to use Token and send request to Tyk GW', () => {
      const bearerToken = `Bearer ${tokenFromKeycloak}`;
      gw_connection.expectTokenWorksWithGW(CUSTOM_API_TEAM_D_NAME, bearerToken);
    });
    
    it('Developer is able to revoke access', () => {
      approved_request_object.REVOKE_BUTTON.click();
      dev_apps_page.POPUP_REVOKE_BUTTON.click();
      dev_apps_page.APPS_TABLE.clickCellWithText(appName);
      dev_apps_page.expectCountOfApprovedRequests(0);
    });

    it('After revoking developer can not get token from Kecloak', () => {
        keycloak_connection.checkIfClientWasDeleted(clientID, clientSecret);
    });


});
};