import { login_page } from '../../../lib/pom/Login_page';
import { portal_page } from '../../../lib/pom/Portal_page';
import { admin_page } from '../../../lib/pom/Admin_page';
import { dev_catalogues_page } from '../../../lib/pom/Dev_catalogues_page';
import { main_page } from '../../../lib/pom/Main_page';
import { catalogues_page } from '../../../lib/pom/Catalogues_page';
import { PRODUCT_PUBLIC_NAME, PRODUCT_PRIVATE_NAME,
     CUSTOM_CATALOGUE_TEAM_B_NAME, PRODUCT_TEAM_B_NAME, GOLD_PLAN_NAME } from '../../../config_variables';

describe('Catalogues visiblity - creating new catalogues', () => {
    const catalogueTeamBDetails = {
        name: CUSTOM_CATALOGUE_TEAM_B_NAME,
        path: "TeamB",
        visibility: "Private",
        team: "teamB | orgB",
        products: PRODUCT_TEAM_B_NAME,
        plans: GOLD_PLAN_NAME 
      };

    before(() => {
        login_page.open();
        login_page.loginAsDevB();
      });

    it('Logged user (devB@tyk.io) can see only Public and Private products - before adding new one', () => {
        main_page.CATALOGUES_BUTTON.click();
        const cataloguesNames = dev_catalogues_page.getNamesOfDisplayedProducts();
        expect(cataloguesNames).to.have.members([PRODUCT_PUBLIC_NAME, PRODUCT_PRIVATE_NAME]);
    });

    it('Admin is able to create custom catalogue (assigned to devB team)', () => {
        portal_page.logOut();
        login_page.open();
        login_page.login();
        admin_page.CATALOGUES_BUTTON.click();
        catalogues_page.addCatalogue(catalogueTeamBDetails);
        catalogues_page.TABLE.expectCellWithTextToBeDisplayed(catalogueTeamBDetails.name);
    });

    it('New catalogue is not visible for not-logged users', () => {
        admin_page.logOut();
        main_page.CATALOGUES_BUTTON.click();
        const cataloguesNames = dev_catalogues_page.getNamesOfDisplayedProducts();
        expect(cataloguesNames).not.to.have.members([PRODUCT_TEAM_B_NAME]);
    });

    it('New catalogue should be visible for devB@tyk.io user', () => {
        login_page.open();
        login_page.loginAsDevB();
        main_page.CATALOGUES_BUTTON.click();
        const cataloguesNames = dev_catalogues_page.getNamesOfDisplayedProducts();
        expect(cataloguesNames).to.have.members([PRODUCT_PUBLIC_NAME, PRODUCT_PRIVATE_NAME, PRODUCT_TEAM_B_NAME]);
    });

    it('New catalogue should not be visible for devA@tyk.io user', () => {
        portal_page.logOut();
        login_page.open();
        login_page.loginAsDevA();
        main_page.CATALOGUES_BUTTON.click();
        const cataloguesNames = dev_catalogues_page.getNamesOfDisplayedProducts();
        expect(cataloguesNames).not.to.have.members([PRODUCT_TEAM_B_NAME]);
    });

    it('Admin is able to delete catalogue', () => {
        portal_page.logOut();
        login_page.open();
        login_page.login();
        main_page.CATALOGUES_BUTTON.click();
        const rowNumber = catalogues_page.TABLE.getRowNumberOfCellWithValue(catalogueTeamBDetails.name);
        catalogues_page.TABLE.deleteRow(rowNumber);
        catalogues_page.TABLE.expectCellWithTextNotToBeDisplayed(catalogueTeamBDetails.name);
    });

    it('Deleted catalogue is no longer visible in live portal', () => {
        admin_page.logOut();
        login_page.open();
        login_page.loginAsDevB();
        main_page.CATALOGUES_BUTTON.click();
        const cataloguesNames = dev_catalogues_page.getNamesOfDisplayedProducts();
        expect(cataloguesNames).not.to.have.members([PRODUCT_TEAM_B_NAME]);
    });
});