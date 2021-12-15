import { login_page } from '../../lib/pom/Login_page';
import { main_page } from '../../lib/pom/Main_page';
import { portal_products_page } from '../../lib/pom/Portal_products_page';
import { portal_cart_page } from '../../lib/pom/Portal_cart_page';
import { portal_apps_page } from '../../lib/pom/Portal_apps_page';
import { uuid } from 'uuidv4';
import { PRODUCT_PUBLIC_NAME, FREE_PLAN_NAME} from '../../config_variables';

const Portal_catalogue_card_object = require('../../lib/wrappers/portal_catalogue_card_object');
var appName;

describe('Requesting the access key with auto-approve', () => {
  appName = "test app 1 " + uuid();

  before(() => {
    login_page.open();
    login_page.loginAsDevA();
  });

  it('Developer should be able to add product to a cart', () => {
    main_page.CATALOGUES_BUTTON.click();
    const publicProductCart = new Portal_catalogue_card_object(PRODUCT_PUBLIC_NAME);
    publicProductCart.MORE_INFO_BUTTON.click();
    portal_products_page.ADD_TO_CART_BUTTON.click();
    wdioExpect(portal_products_page.GO_TO_CART_CONFIRM_BUTTON).toBeDisplayed();
  });

  it("Developer should be able to submit provisioning requets  and create a new app", () => {
    portal_products_page.GO_TO_CART_CONFIRM_BUTTON.click();
    portal_cart_page.SELECT_A_PLAN_DROPDOWN.selectOption(FREE_PLAN_NAME);
    portal_cart_page.CREATE_NEW_APP_BUTTON.click();
    portal_cart_page.APP_NAME_INPUT.setValue(appName);
    portal_cart_page.REDIRECT_URLS_INPUT.setValue("http://redirect");
    portal_cart_page.SUBMIT_REQUEST_BUTTON.click();
    wdioExpect(portal_cart_page.GO_TO_MY_APPS_BUTTON).toBeDisplayed();
  });

  it('Developer should see the pending request in app view', () => {
    portal_cart_page.GO_TO_MY_APPS_BUTTON.click();
    portal_apps_page.APPS_TABLE.clickCellWithText(appName);
    portal_apps_page.expectCountOfPendingRequests(1);
  });
  
});

module.exports = appName;