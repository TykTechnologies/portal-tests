import { login_page } from '../../../lib/pom/Login_page';
import { dev_catalogues_page } from '../../../lib/pom/Dev_catalogues_page';
import { main_page } from '../../../lib/pom/Main_page';
import { PRODUCT_PRIVATE_NAME, PRODUCT_ORG_A_NAME, PRODUCT_TEAM_A_NAME } from '../../../config_variables';

describe('Search functionality in Portal Catalogue page', () => {
    const countOfAllCatalogues = 4;
    const errorMessage = "Incorrect number of visible catalogues!";

    before(() => {
        login_page.open();
        login_page.loginAsDevA();
      });

    it('Developer can use text search', () => {
        const expectedCountOfOrgProducts = 1;
        main_page.CATALOGUES_BUTTON.click();
        dev_catalogues_page.SEARCH_INPUT.setValue("org");
        dev_catalogues_page.SEARCH_BUTTON.click();
        const cataloguesCardsArray = dev_catalogues_page.getAllDisplayedProducts();
        expect(cataloguesCardsArray).to.have.lengthOf(expectedCountOfOrgProducts, errorMessage);
        const cataloguesNames = dev_catalogues_page.getNamesOfDisplayedProducts();
        expect(cataloguesNames).to.have.members([PRODUCT_ORG_A_NAME]);
    });

    it('Developer can clear search criteria', () => {
        dev_catalogues_page.SEARCH_INPUT.clear();
        dev_catalogues_page.SEARCH_BUTTON.click();
        const cataloguesCardsArray = dev_catalogues_page.getAllDisplayedProducts();
        expect(cataloguesCardsArray).to.have.lengthOf(countOfAllCatalogues, errorMessage);
    });

    const filterTests = [["Private Catalogue", PRODUCT_PRIVATE_NAME], ["Team A Catalogue", PRODUCT_TEAM_A_NAME],
                            ["Org A Catalogue", PRODUCT_ORG_A_NAME]];

    filterTests.forEach(testData => {
        it(`Developer can filter for only ${testData[0]} catalogues`, () => {
            dev_catalogues_page.SEARCH_DROPDOWN.selectOption(testData[0]);
            dev_catalogues_page.SEARCH_BUTTON.click();
            const cataloguesCardsArray = dev_catalogues_page.getAllDisplayedProducts();
            expect(cataloguesCardsArray).to.have.lengthOf(1, errorMessage);
            const cataloguesNames = dev_catalogues_page.getNamesOfDisplayedProducts();
            expect(cataloguesNames).to.have.members([testData[1]]);
        });
    });

    it('Developer can do text search with filtering', () => {
        dev_catalogues_page.SEARCH_INPUT.setValue("org");
        dev_catalogues_page.SEARCH_BUTTON.click();
        const cataloguesCardsArray = dev_catalogues_page.getAllDisplayedProducts();
        expect(cataloguesCardsArray).to.have.lengthOf(1, errorMessage);
        const cataloguesNames = dev_catalogues_page.getNamesOfDisplayedProducts();
        expect(cataloguesNames).to.have.members([PRODUCT_ORG_A_NAME]);

        dev_catalogues_page.SEARCH_INPUT.setValue("notExisting");
        dev_catalogues_page.SEARCH_BUTTON.click();
        const cataloguesCardsArrayEmpty = dev_catalogues_page.getAllDisplayedProducts();
        expect(cataloguesCardsArrayEmpty).to.have.lengthOf(0, errorMessage);

    });

});