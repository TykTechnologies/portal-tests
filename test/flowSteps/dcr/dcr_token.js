import { login_page } from '../../../lib/pom/Login_page';
import { portal_page } from '../../../lib/pom/Portal_page';
import { GW_connection } from '../../../lib/GW_connection';
import { Keycloak_connection } from '../../../lib/Keycloak_connection';
import { PUBLIC_API_NAME } from '../../../config_variables';
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

    it('Developer should see approved DCR provisioning requet', () => {
      portal_page.openMyApps();
      dev_apps_page.APPS_TABLE.clickCellWithText(appName);
      dev_apps_page.expectCountOfApprovedRequests(1);
      approved_request_object = dev_apps_page.getAllApprovedRequests()[0];
      approved_request_object.expectApprovedState();
    });

    xit('Provisioning requests should not be displayed as pending anymore', () => {
        keycloak_connection.getToken();
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

//     it('Developer is able to use Token and send request to Tyk GW', () => {
//       gw_connection.expectTokenWorksWithGW(PUBLIC_API_NAME, token);
//     });

//     it('Developer is able to rotate token', () => {
//       approved_request_object.ROTATE_BUTTON.click();
//       dev_apps_page.POPUP_ROTATE_BUTTON.click();
//       rotatedToken = approved_request_object.getToken();
//       expect(rotatedToken).to.not.be.empty;
//     });

//     it('New token is different from initial one', () => {
//       expect(token).to.not.equal(rotatedToken);
//     });

//     it('New token works with GW', () => {
//       gw_connection.expectTokenWorksWithGW(PUBLIC_API_NAME, rotatedToken);
//     });

//     it('Old token is NOT recognized by GW', () => {
//       const response = gw_connection.sendGetRequestWithToken(PUBLIC_API_NAME, token);
//       expect(response.statusCode).to.equal(403);
//     });
    
//     it('Developer is able to revoke token', () => {
//       approved_request_object.REVOKE_BUTTON.click();
//       dev_apps_page.POPUP_REVOKE_BUTTON.click();
//       dev_apps_page.APPS_TABLE.clickCellWithText(appName);
//       dev_apps_page.expectCountOfApprovedRequests(0);
//     });

//     it('Revoked token is NOT recognized by GW', () => {
//       const response = gw_connection.sendGetRequestWithToken(PUBLIC_API_NAME, rotatedToken);
//       expect(response.statusCode).to.equal(403);
//     });
//   });

});
};