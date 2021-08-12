import { login_page } from '../../../lib/pom/Login_page';
import { admin_page } from '../../../lib/pom/Admin_page';
import { Gateway_connection } from '../../../lib/gateway_connection';
import { providers_page } from '../../../lib/pom/Providers_page';
import { TYK_ORG_ID, TYK_SECRET } from '../../../config_variables';

describe('Synchronize with Tyk Pro', () => {
  const expectedCountOfServices = "1";
  const expectedCountOfTiers = "1";
  const providerDetails = {
    name: "tyk provider",
    type: "tyk-pro",
    metaData: `{"URL": "http://localhost:3005", "Secret": "${TYK_SECRET}", "OrgID": "${TYK_ORG_ID}"}`,
  };

  before(() => {
    require('expect-webdriverio').setOptions({ wait: 60000 });
    const gw_connection = new Gateway_connection();
    gw_connection.waitUntilGWisUp();
    login_page.open();
    login_page.login();
  });

  it('Admin should be able to update default provider with proper Tyk details', () => {
    admin_page.PROVIDERS_BUTTON.click();
    providers_page.TABLE.clickCellWithText("tyk-pro");
    providers_page.EDIT_BUTTON.click();
    browser.pause(1000);
    providers_page.NAME_INPUT.waitForClickable();
    providers_page.NAME_INPUT.setValue(providerDetails.name);
    providers_page.METADATA_INPUT.setValue(providerDetails.metaData);
    providers_page.SAVE_CHANGES_BUTTON.click();
  });

  it('New connection to Tyk is visible in the org table', () => {
    wdioExpect($(`div=${providerDetails.name}`)).toBeDisplayed();
  });

  it('Admin is able synchronize the services', () => {
    providers_page.SYNCHRONIZE_BUTTON.click();
    providers_page.DIALOG_OK_BUTTON.click();
    const servicesCell = providers_page.getTabelServiceCellFromRow(1);
    const tiersCell = providers_page.getTabelServiceCellFromRow(1);
    wdioExpect(servicesCell).toHaveText(expectedCountOfServices);
    wdioExpect(tiersCell).toHaveText(expectedCountOfTiers);
  });
  
});