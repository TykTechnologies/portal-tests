import { login_page } from '../../../lib/pom/Login_page';
import { admin_page } from '../../../lib/pom/Admin_page';
import { org_page } from '../../../lib/pom/Org_page';

describe('Creating new Organisation', () => {
  const orgDetails = {
    name: "test-org",
    name_update: "test-org-update"
  };

  before(() => {
    login_page.open();
    login_page.login();
  });

  it('Admin should be able to create an Organisation', () => {
    admin_page.ORGANIATIONS_BUTTON.click();
    org_page.ADD_BUTTON.click();
    org_page.NAME_INPUT.setValue(orgDetails.name);
    org_page.SUBMIT_NEW_BUTTON.click();
  });

  it('New org is visible in the org table', () => {
    wdioExpect($(`div=${orgDetails.name}`)).toBeDisplayed();
  });

  it('Admin is able to update Org name', () => {
    org_page.TABLE.clickCellWithText(orgDetails.name);
    org_page.EDIT_BUTTON.click();
    org_page.NAME_INPUT.waitForClickable();
    org_page.NAME_INPUT.setValue(orgDetails.name_update);
    org_page.SAVE_CHANGES_BUTTON.click();
    wdioExpect($(`div=${orgDetails.name}`)).not.toBeDisplayed();
    wdioExpect($(`div=${orgDetails.name_update}`)).toBeDisplayed();
  });

  it('Admin should be able to delete Org', () => {
    org_page.TABLE.deleteRow(0);
    const wasRowDeleted = org_page.TABLE.isCellWithTextNotDisplayed(orgDetails.name_update);
    expect(wasRowDeleted).to.be.true;
  });
  
});