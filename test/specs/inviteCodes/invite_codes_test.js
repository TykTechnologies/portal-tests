import { login_page } from '../../../lib/pom/Login_page';
import { admin_page } from '../../../lib/pom/Admin_page';
import { invite_codes_page } from '../../../lib/pom/Invite_codes_page';
import { org_page } from '../../../lib/pom/Org_page';
import { assert } from 'chai';

describe('CRUD actions on invite codes', () => {
  let inviteCode;
  const orgName = "testCodeflow";
  const inviteCodeDetails = {
    quota: "1",
    expires: "2023-09-05 00:00",
  };

  before(() => {
    login_page.open();
    login_page.login();
  });

  it('Admin creates an Org', () => {
    admin_page.ORGANIATIONS_BUTTON.click();
    org_page.ADD_BUTTON.click();
    org_page.NAME_INPUT.setValue(orgName);
    org_page.SUBMIT_NEW_BUTTON.click();
  });

  it('Admin should be able to create invite code', () => {
    admin_page.INVITE_CODES_BUTTON.click();
    const initialTableRowCount = invite_codes_page.TABLE.getRowCount();
    invite_codes_page.ADD_BUTTON.click();
    invite_codes_page.fillNewInviteCodeForm(inviteCodeDetails);
    invite_codes_page.SAVE_BUTTON.click();
    browser.waitUntil(() => invite_codes_page.TABLE.getRowCount() === initialTableRowCount + 1);
    inviteCode = invite_codes_page.getCodeFromRow(0);
    assert.isDefined(inviteCode, "Invite code not displayed!");
  });

  it('Admin is able to update the invite code', () => {
    const newQuota = "5";
    invite_codes_page.TABLE.clickCellWithText(inviteCode);
    invite_codes_page.QUOTA_INPUT.setValue(newQuota);
    invite_codes_page.SAVE_CHANGES_BUTTON.click();
    const quotaCell = invite_codes_page.TABLE.getCellElement(0, "Redeem");
    wdioExpect(quotaCell).toHaveText(`${newQuota} / 0`);
  });

  it('Admin should be able to delete Invite code', () => {
    browser.pause(2000);
    invite_codes_page.deleteRowWithCode(inviteCode);
    const wasRowDeleted = invite_codes_page.TABLE.isCellWithTextNotDisplayed(inviteCode);
    assert.isTrue(wasRowDeleted, "Row was not deleted!");
  });
  
});