import { login_page } from '../../../lib/pom/Login_page';
import { admin_page } from '../../../lib/pom/Admin_page';
import { providers_page } from '../../../lib/pom/Providers_page';
import { TYK_ORG_ID, TYK_SECRET, TYK_PRO_URL } from '../../../config_variables';

describe('Synchronize with Tyk Pro', () => {
  const expectedCountOfProducts = "4";
  const expectedCountOfPlans = "1";
  const providerDetails = {
    name: "tyk provider synchro test",
    url: TYK_PRO_URL,
    secter: TYK_SECRET,
    org_id: TYK_ORG_ID  
  };

  before(() => {
    var exec = require('child_process').exec;
    var command = 'curl -X GET http://localhost:3000/api/apis --header "Authorization:3b95bd85db9049f1412bcaa2eed78cd9"';
    var child = exec(command, function(error, stdout, stderr){

      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      
      if(error !== null)
      {
          console.log('exec error: ' + error);
      }
      
      });
    // browser.url("http://localhost:3000");
    // // login_page.open();
    // login_page.login("raava@tyk.io", "test123");
    // wdioExpect(".tyk-nav-bar__right").toBeDisplayed()
  });

  it('checking tyk pro', () => {
    browser.url("http://localhost:3000");
    // login_page.open();
    login_page.USERNAME_INPUT.setValue("raava@tyk.io");
    login_page.PASSWORD_INPUT.setValue("test123");
    $('button*=Login').click();
    wdioExpect($(".tyk-nav-bar__right")).toBeDisplayed();
    $('span*=APIs').click();
    wdioExpect($("a*=raava_oauth_2")).toBeDisplayed();
  })

  it('Admin should be able to ADD provider with proper Tyk details', () => {
    admin_page.PROVIDERS_BUTTON.click();
    // providers_page.TABLE.clickCellWithText("tyk-pro");
    providers_page.ADD_BUTTON.click();
    providers_page.NAME_INPUT.waitForClickable();
    providers_page.NAME_INPUT.setValue(providerDetails.name);
    providers_page.URL_INPUT.setValue(providerDetails.url);
    providers_page.SECRET_INPUT.setValue(providerDetails.secter);
    providers_page.ORG_ID_INPUT.setValue(providerDetails.org_id);
    providers_page.SAVE_BUTTON.click();
    wdioExpect(providers_page.TABLE.$(`div*=${providerDetails.name}`)).toBeDisplayed();    
  });

  it('Admin is able synchronize the services', () => {
    providers_page.SYNCHRONIZE_BUTTON.click();
    providers_page.DIALOG_OK_BUTTON.click();
    const providerRowNumber = providers_page.TABLE.getRowNumberOfCellWithValue(providerDetails.name);
    console.log(`>>> checking the provider in row ${providerRowNumber}`);
    const productsCell = providers_page.getTabelProductsCellFromRow(providerRowNumber);
    const plansCell = providers_page.getTabelPlansCellFromRow(providerRowNumber);
    wdioExpect(productsCell).toHaveText(expectedCountOfProducts);
    wdioExpect(plansCell).toHaveText(expectedCountOfPlans);
  });
  
});