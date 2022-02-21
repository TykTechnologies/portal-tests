import { login_page } from '../../../lib/pom/Login_page';
import { admin_page } from '../../../lib/pom/Admin_page';
import { teams_page } from '../../../lib/pom/Teams_page';
import { ORG_B_NAME } from '../../../config_variables';

describe('Creating new Team', () => {
  const teamDetails = {
    name: "test-team",
    name_update: "test-tesm-update",
    org: ORG_B_NAME
  };

  before(() => {
    login_page.open();
    login_page.login();
  });

  it('Admin should be able to create an Team', () => {
    admin_page.TEAMS_BUTTON.click();
    teams_page.ADD_BUTTON.click();
    teams_page.NAME_INPUT.setValue(teamDetails.name);
    teams_page.ORG_DROPDOWN.selectOption(teamDetails.org);
    teams_page.SUBMIT_NEW_BUTTON.click();
  });

  it('New Team is visible in the Team table', () => {
    wdioExpect($(`div=${teamDetails.name}`)).toBeDisplayed();
  });

  it('Admin is able to update Team name', () => {
    teams_page.TABLE.clickCellWithText(teamDetails.name);
    teams_page.NAME_INPUT.waitForClickable();
    teams_page.NAME_INPUT.setValue(teamDetails.name_update);
    teams_page.SAVE_CHANGES_BUTTON.click();
    wdioExpect($(`div=${teamDetails.name}`)).not.toBeDisplayed();
    wdioExpect($(`div=${teamDetails.name_update}`)).toBeDisplayed();
  });

  it('Admin should be able to delete Team', () => {
    const rowNumber = teams_page.TABLE.getRowNumberOfCellWithValue(teamDetails.name_update);
    teams_page.TABLE.deleteRow(rowNumber);
    const wasRowDeleted = teams_page.TABLE.isCellWithTextNotDisplayed(teamDetails.name_update);
    expect(wasRowDeleted).to.be.true;
  });
  
});