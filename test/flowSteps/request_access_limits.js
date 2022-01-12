import { login_page } from '../../lib/pom/Login_page';
import { main_page } from '../../lib/pom/Main_page';
import { dev_products_page } from '../../lib/pom/Dev_products_page';
import { dev_cart_page } from '../../lib/pom/Dev_cart_page';
import { dev_apps_page } from '../../lib/pom/Dev_apps_page';
import { uuid } from 'uuidv4';
import { PRODUCT_PUBLIC_NAME, FREE_PLAN_NAME} from '../../config_variables';

var appName;
const Portal_catalogue_card_object = require('../../lib/wrappers/portal_catalogue_card_object');

describe('Requesting the access key', () => {
  appName = "test app " + uuid();

  before(() => {
    login_page.open();
    login_page.loginAsDevA1();
  });

  it('Developer should be able to add product to a cart', () => {
    main_page.CATALOGUES_BUTTON.click();
    const publicProductCart = new Portal_catalogue_card_object(PRODUCT_PUBLIC_NAME);
    publicProductCart.MORE_INFO_BUTTON.click();
    dev_products_page.ADD_TO_CART_BUTTON.click();
    wdioExpect(dev_products_page.GO_TO_CART_CONFIRM_BUTTON).toBeDisplayed();
  });

  it("Developer should be able to submit provisioning requets  and create a new app", () => {
    dev_products_page.GO_TO_CART_CONFIRM_BUTTON.click();
    dev_cart_page.SELECT_A_PLAN_DROPDOWN.selectOption(FREE_PLAN_NAME);
    dev_cart_page.CREATE_NEW_APP_BUTTON.click();
    dev_cart_page.APP_NAME_INPUT.setValue(appName);
    dev_cart_page.REDIRECT_URLS_INPUT.setValue("http://redirect");
    dev_cart_page.SUBMIT_REQUEST_BUTTON.click();
    wdioExpect(dev_cart_page.GO_TO_MY_APPS_BUTTON).toBeDisplayed();
  });

  it('Developer should see the pending request in app view', () => {
    dev_cart_page.GO_TO_MY_APPS_BUTTON.click();
    dev_apps_page.APPS_TABLE.clickCellWithText(appName);
    dev_apps_page.expectCountOfPendingRequests(1);
  });
  
});

module.exports = appName;