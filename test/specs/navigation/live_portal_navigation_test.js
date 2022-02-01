import { login_page } from '../../../lib/pom/Login_page';
import { welcome_page } from '../../../lib/pom/Welcome_page';

describe('Live portal navigation', () => {

    before(() => {
        login_page.open();
        login_page.loginAsDevB();
    });

    it('Developer lands on welcome page', () => {
        wdioExpect(welcome_page.WELCOME_SECTION_HEAD).toBeDisplayed();
    });

    it('Developer can be forwarded from welcome page to API products', () => {
        welcome_page.EXPLORE_API_PRODUCTS_BUTTON.click();
        wdioExpect(browser).toHaveTitleContaining("Product Catalogues");
    });

    it('Developer can see Getting started section on Welcome page', () => {
        browser.back();
        wdioExpect(welcome_page.GETTING_STARTED_SECTION_HEAD).toBeDisplayed();
    });

    it('Developer can be forwarded from welcome page to API products', () => {
        welcome_page.READ_MORE_BUTTON.click();
        wdioExpect(browser).toHaveTitleContaining("About Tyk Portal");
        wdioExpect($('h1*=About Tyk Portal')).toBeDisplayed();
    });
});