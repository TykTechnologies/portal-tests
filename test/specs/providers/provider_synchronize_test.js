import { login_page } from '../../../lib/pom/Login_page';
import { admin_page } from '../../../lib/pom/Admin_page';
import { providers_page } from '../../../lib/pom/Providers_page';
import { ORG_2_TYK_ORG_ID, ORG_2_TYK_SECRET, TYK_PRO_URL, PROVIDER_NAME, PRODUCT_COUNT, PLAN_COUNT} from '../../../config_variables';

describe('Synchronize with Tyk Pro', () => {
  const expectedCountOfProducts = "2";
  const expectedCountOfPlans = "1";
  const providerDetails = {
    name: "provider synchro test",
    url: TYK_PRO_URL,
    org_id: ORG_2_TYK_ORG_ID,
    secret: ORG_2_TYK_SECRET   
  };
  const providerDetailsSingle = {
    name: "provider test single row synch",
    url: TYK_PRO_URL,
    org_id: ORG_2_TYK_ORG_ID,
    secret: ORG_2_TYK_SECRET   
  };

  before(() => {    
    login_page.open();
    login_page.login();
  });


  it('Admin should be able to ADD providers with proper Tyk details', () => {
    admin_page.PROVIDERS_BUTTON.click();    
    providers_page.addProvider(providerDetailsSingle);
    wdioExpect(providers_page.TABLE.$(`div*=${providerDetailsSingle.name}`)).toBeDisplayed();
  });

  it('Admin is able synchronize single Providers', () => {
    const providerRowNumber = providers_page.TABLE.getRowNumberOfCellWithValue(providerDetailsSingle.name);
    providers_page.TABLE.synchronizeRow(providerRowNumber);
    console.log(`>>> checking the provider in row ${providerRowNumber}`);
    const productsCell = providers_page.getTabelProductsCellFromRow(providerRowNumber);
    const plansCell = providers_page.getTabelPlansCellFromRow(providerRowNumber);
    wdioExpect(productsCell).toHaveText(expectedCountOfProducts);
    wdioExpect(plansCell).toHaveText(expectedCountOfPlans);

       //other provider should NOT be synchronized - BUG TT-4013
  //   const notSynchProviderRowNumber = providers_page.TABLE.getRowNumberOfCellWithValue(providerDetails.name);
  //   console.log(`>>> checking the provider in row ${notSynchProviderRowNumber}`);
  //   const productsCellZero = providers_page.getTabelProductsCellFromRow(notSynchProviderRowNumber);
  //   const plansCellZero = providers_page.getTabelPlansCellFromRow(notSynchProviderRowNumber);
  //   wdioExpect(productsCellZero).toHaveText("0");
  //   wdioExpect(plansCellZero).toHaveText("0");
  });

  it('Admin is able synchronize all Providers', () => {
    providers_page.addProvider(providerDetails);
    wdioExpect(providers_page.TABLE.$(`div*=${providerDetails.name}`)).toBeDisplayed();
    browser.pause(2000);
    providers_page.SYNCHRONIZE_BUTTON.click();
    providers_page.DIALOG_OK_BUTTON.click();
    const providerRowNumber = providers_page.TABLE.getRowNumberOfCellWithValue(providerDetails.name);
    console.log(`>>> checking the provider in row ${providerRowNumber}`);
    const productsCell = providers_page.getTabelProductsCellFromRow(providerRowNumber);
    const plansCell = providers_page.getTabelPlansCellFromRow(providerRowNumber);
    wdioExpect(productsCell).toHaveText(expectedCountOfProducts);
    wdioExpect(plansCell).toHaveText(expectedCountOfPlans);
  });

  it('Already created Provider is correctly synchronized', () => {
    const providerRowNumber = providers_page.TABLE.getRowNumberOfCellWithValue(PROVIDER_NAME);
    console.log(`>>> checking the provider in row ${providerRowNumber}`);
    const productsCell = providers_page.getTabelProductsCellFromRow(providerRowNumber);
    const plansCell = providers_page.getTabelPlansCellFromRow(providerRowNumber);
    wdioExpect(productsCell).toHaveText(PRODUCT_COUNT);
    wdioExpect(plansCell).toHaveText(PLAN_COUNT);
  });

  it('Admin is able to delete the Provider', () => {
    const providerRowNumber = providers_page.TABLE.getRowNumberOfCellWithValue(providerDetails.name);
    providers_page.TABLE.deleteRow(providerRowNumber);
    const wasProviderDeleted = providers_page.TABLE.isCellWithTextNotDisplayed(providerDetails.name);
    expect(wasProviderDeleted).to.be.true;

    const providerRowNumberSingle = providers_page.TABLE.getRowNumberOfCellWithValue(providerDetailsSingle.name);
    providers_page.TABLE.deleteRow(providerRowNumberSingle);
    const wasProviderSingleDeleted = providers_page.TABLE.isCellWithTextNotDisplayed(providerDetailsSingle.name);
    expect(wasProviderSingleDeleted).to.be.true;
  });
  
});
