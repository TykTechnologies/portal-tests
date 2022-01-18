import { login_page } from '../../../lib/pom/Login_page';
import { portal_page } from '../../../lib/pom/Portal_page';
import { dev_catalogues_page } from '../../../lib/pom/Dev_catalogues_page';
import { main_page } from '../../../lib/pom/Main_page';
import variables from '../../../config_variables';

describe('Custom catalogue visibility - already created catalogues', () => {
    const privateAndPublicProducts = [variables.PRODUCT_PUBLIC_NAME, variables.PRODUCT_PRIVATE_NAME];
    const expectedBaselineForDevA = {
        countOfProducts: 4,
        productsNames: [...privateAndPublicProducts, variables.PRODUCT_ORG_A_NAME, variables.PRODUCT_TEAM_A_NAME]
    };

    before(() => {
        login_page.open();
        login_page.loginAsDevA();
      });

    it('Logged user (devA@tyk.io) can see Public, Private and assigned Catalogue products', () => {
        main_page.CATALOGUES_BUTTON.click();
        const cataloguesNames = dev_catalogues_page.getNamesOfDisplayedProducts();
        expect(cataloguesNames).to.have.members(expectedBaselineForDevA.productsNames);
    });

    it('After log-out user can see only public products', () => {
        portal_page.logOut();
        main_page.CATALOGUES_BUTTON.click();
        const cataloguesNames = dev_catalogues_page.getNamesOfDisplayedProducts();
        expect(cataloguesNames).to.have.members([variables.PRODUCT_PUBLIC_NAME]);
    });

    it('Logged user (devA1@tyk.io) can see only Public, Private and orgA products', () => {
        login_page.open();
        login_page.loginAsDevA1();
        main_page.CATALOGUES_BUTTON.click();
        const cataloguesNames = dev_catalogues_page.getNamesOfDisplayedProducts();
        expect(cataloguesNames).to.have.members([...privateAndPublicProducts, variables.PRODUCT_ORG_A_NAME], 
            "User is assigned to teamA1. Should see only Public, Private and catalogues from orgA. We have visibility issue!");
    });
});