import { login_page } from '../../../lib/pom/Login_page';
import { portal_catalogues_page } from '../../../lib/pom/Portal_catalogues_page';
import { portal_products_page } from '../../../lib/pom/Portal_products_page';
import { main_page } from '../../../lib/pom/Main_page';
import { PRODUCT_PUBLIC_NAME } from '../../../config_variables';

describe('Public catalogue', () => {
    const expectedCountOfVisibleCatalogues = 1;
    const expectedCatalogueName = PRODUCT_PUBLIC_NAME;

    before(() => {
        login_page.open();
      });

    it('Not logged user can see only Public Catalogue products', () => {
        main_page.CATALOGUES_BUTTON.click();
        const cataloguesCardsArray = portal_catalogues_page.getAllDisplayedProducts();
        expect(cataloguesCardsArray).to.have.lengthOf(expectedCountOfVisibleCatalogues, "Incorrect number of visible catalogues!");
        const cataloguesNames = portal_catalogues_page.getNamesOfDisplayedProducts();
        expect(cataloguesNames[0]).to.be.equal(expectedCatalogueName);
    });

    it('Not logged user can not add product to cart', () => {
        const cataloguesCardsArray = portal_catalogues_page.getAllDisplayedProducts();
        const PUBLIC_CATALOGUE = cataloguesCardsArray[0];
        PUBLIC_CATALOGUE.MORE_INFO_BUTTON.click();
        browser.pause(2000);
        wdioExpect(portal_products_page.ADD_TO_CART_BUTTON).not.toBeDisplayed();
    });
});