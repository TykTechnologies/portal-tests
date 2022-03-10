import { login_page } from '../../../lib/pom/Login_page';
import { dev_catalogues_page } from '../../../lib/pom/Dev_catalogues_page';
import { dev_products_page } from '../../../lib/pom/Dev_products_page';
import { main_page } from '../../../lib/pom/Main_page';
import { PRODUCT_PUBLIC_NAME } from '../../../config_variables';

//Enable after https://tyktech.atlassian.net/browse/TT-4498 will be fixed
xdescribe('Public catalogue', () => {
    const expectedCountOfVisibleCatalogues = 1;
    const expectedCatalogueName = PRODUCT_PUBLIC_NAME;

    before(() => {
        login_page.open();
      });

    it('Not logged user can see only Public Catalogue products', () => {
        main_page.CATALOGUES_BUTTON.click();
        const cataloguesCardsArray = dev_catalogues_page.getAllDisplayedProducts();
        expect(cataloguesCardsArray).to.have.lengthOf(expectedCountOfVisibleCatalogues, "Incorrect number of visible catalogues!");
        const cataloguesNames = dev_catalogues_page.getNamesOfDisplayedProducts();
        expect(cataloguesNames[0]).to.be.equal(expectedCatalogueName);
    });

    it('Not logged user can not add product to cart', () => {
        const cataloguesCardsArray = dev_catalogues_page.getAllDisplayedProducts();
        const PUBLIC_CATALOGUE = cataloguesCardsArray[0];
        PUBLIC_CATALOGUE.MORE_INFO_BUTTON.click();
        browser.pause(2000);
        wdioExpect(dev_products_page.ADD_TO_CART_BUTTON).not.toBeDisplayed();
    });
});