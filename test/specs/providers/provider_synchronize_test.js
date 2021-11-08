import { login_page } from '../../../lib/pom/Login_page';
import { admin_page } from '../../../lib/pom/Admin_page';
import { providers_page } from '../../../lib/pom/Providers_page';
import { TYK_ORG_ID, TYK_PRO_URL, TYK_SECRET } from '../../../config_variables';
import { uuid } from 'uuidv4';

describe('Synchronize with Tyk Pro', () => {
  const newTykUserRequestBody = {
    "first_name": "Jason",
    "last_name": "Jasonson",
    "email_address": `testUser${uuid()}@test.com`,
    "active": true,
    "org_id": `${TYK_ORG_ID}`,
    "password": "thisisatest",
    "user_permissions": { "IsAdmin": "admin" }
  };
  const expectedCountOfProducts = "4";
  const expectedCountOfPlans = "1";
  const providerDetails = {
    name: "tyk provider synchro test",
    url: TYK_PRO_URL,
    org_id: TYK_ORG_ID,
    secret: TYK_SECRET   
  };

  before(() => {    
    console.log(`New user was created with secret: ${providerDetails.secret}`);
    login_page.open();
    login_page.login();
  });


  it('Admin should be able to ADD provider with proper Tyk details', () => {
    admin_page.PROVIDERS_BUTTON.click();
    providers_page.ADD_BUTTON.click();
    providers_page.NAME_INPUT.waitForClickable();
    providers_page.NAME_INPUT.setValue(providerDetails.name);
    providers_page.URL_INPUT.setValue(providerDetails.url);
    providers_page.SECRET_INPUT.setValue(providerDetails.secret);
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