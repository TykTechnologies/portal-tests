import { login_page } from '../../lib/pom/Login_page';
import { admin_page } from '../../lib/pom/Admin_page';
import { providers_page } from '../../lib/pom/Providers_page';

describe('Bootstrapping Portal with Provider details', () => {
  const expectedCountOfProducts = "1";
  const expectedCountOfPlans = "0";
  const connectionName = "TykPro@bootstrap";

  before(() => {    
    admin_page.logOut();
    login_page.open();
    login_page.login();
  });

  it('Connection to Provider was created ', () => {
    admin_page.PROVIDERS_BUTTON.click();    
    wdioExpect(providers_page.TABLE.$(`div*=${connectionName}`)).toBeDisplayed();
  });

  it("Plan and policies were fetched (with tag)", () => {
    const productsCell = providers_page.getTabelProductsCellFromRow(0);
    const plansCell = providers_page.getTabelPlansCellFromRow(0);
    wdioExpect(productsCell).toHaveText(expectedCountOfProducts);
    wdioExpect(plansCell).toHaveText(expectedCountOfPlans);
  });
});