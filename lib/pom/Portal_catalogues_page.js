const Page = require('./Page');
const Button_object = require('ui_test_automation/wrappers/Button_object');
const DropDown_object = require('ui_test_automation/wrappers/DropDown_object');
const Input_object = require('ui_test_automation/wrappers/Input_object');
const Catalogue_card_object = require('../wrappers/portal_catalogue_card_object');

class Portal_catalogues_page extends Page {
    get cataloguesNamesSelector() {return '.col-lg-4 h2'};
    get SEARCH_INPUT() { return new Input_object('#search'); }
    get SEARCH_DROPDOWN() { return new DropDown_object('#catalogue'); }
    get SEARCH_BUTTON() { return new Button_object('button[type="submit"]'); }

    checkIfPageIsOpened() { wdioExpect(this.SECTION_TITLE_TEXT).toBeDisplayed(); }

    getAllDisplayedProducts() { 
        const cataloguesNameLabels = $$(this.cataloguesNamesSelector);
        console.log(`>>> ${cataloguesNameLabels.length} catalogues cards were found on page`);
        const cataloguesCardsArray = cataloguesNameLabels.map(cataloguesLabel => {
            return new Catalogue_card_object(cataloguesLabel.getText());
        });
        return cataloguesCardsArray;
    };

    getNamesOfDisplayedProducts() {
        return $$(this.cataloguesNamesSelector).map( label => label.getText());
    };

    getProductWithName(productName) {
        const allProducts = this.getAllDisplayedProducts();
        allProducts.forEach( product => {
            if (product.getName() === productName) {
                return product;
            }
        });
    };

}
export const portal_catalogues_page = new Portal_catalogues_page();