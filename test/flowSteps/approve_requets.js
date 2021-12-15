import { login_page } from '../../lib/pom/Login_page';
import { admin_page } from '../../lib/pom/Admin_page';
import { provisioning_requests_page } from '../../lib/pom/Provisioning_requests_page';

module.exports = (appName) => {
    describe('Approving provisioning request', () => {

        before(() => {
            login_page.open();
            login_page.login();
        });
    
        it('Admin should be able to approve provisioning request. App: ' + appName, () => {
            console.log(">>> Approving request in app: " + appName);
            admin_page.PROVISIONING_REQUESTS_BUTTON.click();
            provisioning_requests_page.TABLE.clickCellWithText(appName);
            provisioning_requests_page.APPROVE_BUTTON.click();
            provisioning_requests_page.OK_BUTTON.click();
            provisioning_requests_page.TABLE.clickCellWithText(appName);
            provisioning_requests_page.expectRequestToHaveApproveState();
        });
    
    });
};
