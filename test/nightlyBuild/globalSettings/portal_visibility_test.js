import { login_page } from '../../../lib/pom/Login_page';
import { portal_page } from '../../../lib/pom/Portal_page';
import { dev_catalogues_page } from '../../../lib/pom/Dev_catalogues_page';
import { main_page } from '../../../lib/pom/Main_page';
import { admin_page } from '../../../lib/pom/Admin_page';
import { general_settings_page } from '../../../lib/pom/General_settings_page';
import { URL } from '../../../config_variables';

describe('Portal vibility', () => {
    const cataloguesURLPath = URL + "portal/catalogue-products";
    before(() => {
        login_page.open();
      });
    
    it('Default visiblity setting is public', () => {
        login_page.login();
        admin_page.GENERAL_BUTTON.click();
        wdioExpect(general_settings_page.VISIBILITY_DROPDOWN).toHaveText('Public');
    });

    it('Admin can change visibility to Private', () => {
        general_settings_page.VISIBILITY_DROPDOWN.selectOption("Private");
        general_settings_page.SAVE_CHANGES_BUTTON.click();
        wdioExpect(general_settings_page.SUCCESS_MESSAGE_ALERT).toBeDisplayed();
    });

    it('Admin can see the Private portal', () => {
        browser.url(cataloguesURLPath);
        expectCataloguesPageIsVisible();
        portal_page.logOut();
    });

    it('Not logged user can not see Private Portal', () => {
        main_page.CATALOGUES_BUTTON.click();
        expectCataloguesPageIsNotVisible();
    });

    it('Logged in developer can see Private Portal', () => {
        login_page.open();
        login_page.loginAsDev();
        main_page.CATALOGUES_BUTTON.click();
        expectCataloguesPageIsVisible();
        portal_page.logOut();
    });

    it('Admin can change visibility to Hidden', () => {
        login_page.open();
        login_page.login();
        admin_page.GENERAL_BUTTON.click();
        general_settings_page.VISIBILITY_DROPDOWN.selectOption("Hidden");
        general_settings_page.SAVE_CHANGES_BUTTON.click();
        wdioExpect(general_settings_page.SUCCESS_MESSAGE_ALERT).toBeDisplayed();
    });

    it('Admin can see the Hidden portal', () => {
        browser.url(cataloguesURLPath);
        expectCataloguesPageIsVisible();
        portal_page.logOut();
    });
    
    it('Not logged user can not see Hidden Portal', () => {
        main_page.CATALOGUES_BUTTON.click();
        expectCataloguesPageIsNotVisible();
    });

    it('Logged in developer can not see Hidden Portal', () => {
        login_page.open();
        login_page.loginAsDev();
        main_page.CATALOGUES_BUTTON.click();
        expectCataloguesPageIsNotVisible();
        portal_page.logOut();
    });

    it('Admin can change the visibility back to Public', () => {
        login_page.open();
        login_page.login();
        admin_page.GENERAL_BUTTON.click();
        general_settings_page.VISIBILITY_DROPDOWN.selectOption("Public");
        general_settings_page.SAVE_CHANGES_BUTTON.click();
        wdioExpect(general_settings_page.SUCCESS_MESSAGE_ALERT).toBeDisplayed();
    });

});

const expectCataloguesPageIsVisible = () => {
    wdioExpect(dev_catalogues_page.SEARCH_INPUT).toBeDisplayed();
    wdioExpect(dev_catalogues_page.PORTAL_IS_PRIVATE_LABEL).not.toBeDisplayed();
};

const expectCataloguesPageIsNotVisible = () => {
    wdioExpect(dev_catalogues_page.PORTAL_IS_PRIVATE_LABEL).toBeDisplayed();
    expect(dev_catalogues_page.getCountOfDisplayedProducts()).equal(0);
};