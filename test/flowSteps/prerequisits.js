import { login_page } from '../../lib/pom/Login_page';
import { invite_codes_page } from '../../lib/pom/Invite_codes_page';
import { admin_page } from '../../lib/pom/Admin_page';
import { org_page } from '../../lib/pom/Org_page';
import { teams_page } from '../../lib/pom/Teams_page';

describe('Prerequisits', () => {
  global.prerequisitsData = {
    orgName: "inviteTestOrg",
    teamName: "inviteTestTeam",
    inviteCode: ""
  };

  const inviteCodeDetails = {
    quota: "1",
    expires: "2023-09-05 00:00",
    active: true,
    team: `${prerequisitsData.teamName} | ${prerequisitsData.orgName}`
  };

  before(() => {
    login_page.open();
    login_page.login();
  });

  it('Creating an org', () => {
    admin_page.ORGANIATIONS_BUTTON.click();
    org_page.ADD_BUTTON.click();
    org_page.NAME_INPUT.setValue(prerequisitsData.orgName);
    org_page.SUBMIT_NEW_BUTTON.click();
  });

  it('Creating a Team', () => {
    admin_page.TEAMS_BUTTON.click();
    teams_page.ADD_BUTTON.click();
    teams_page.NAME_INPUT.setValue(prerequisitsData.teamName);
    teams_page.ORG_DROPDOWN.selectOption(prerequisitsData.orgName);
    teams_page.SUBMIT_NEW_BUTTON.click();
  });

  it('Creating invite code', () => {
    admin_page.INVITE_CODES_BUTTON.click();
    invite_codes_page.ADD_BUTTON.click();
    invite_codes_page.fillNewInviteCodeForm(inviteCodeDetails);
    invite_codes_page.SAVE_BUTTON.click();
    browser.pause(2000);
    global.prerequisitsData.inviteCode = invite_codes_page.getCodeFromRow(0);
    console.log(`Invite code created: ${prerequisitsData.inviteCode}`);
   });
});