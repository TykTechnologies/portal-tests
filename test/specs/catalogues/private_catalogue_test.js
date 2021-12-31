import { login_page } from '../../../lib/pom/Login_page';
import { portal_catalogues_page } from '../../../lib/pom/Dev_catalogues_page';
import { main_page } from '../../../lib/pom/Main_page';
import { PRODUCT_PUBLIC_NAME, PRODUCT_PRIVATE_NAME } from '../../../config_variables';

describe('Private catalogue', () => {
    const expectedCountOfVisibleProducts = 2;

    before(() => {
        login_page.open();
        login_page.loginAsDev();
      });

    it('Logged user can see Public and Private Catalogue products', () => {
        main_page.CATALOGUES_BUTTON.click();
        const cataloguesCardsArray = portal_catalogues_page.getAllDisplayedProducts();
        expect(cataloguesCardsArray).to.have.lengthOf(expectedCountOfVisibleProducts, "Incorrect number of visible catalogues!");
        const cataloguesNames = portal_catalogues_page.getNamesOfDisplayedProducts();
        expect(cataloguesNames).to.have.members([PRODUCT_PUBLIC_NAME, PRODUCT_PRIVATE_NAME]);
    });
});