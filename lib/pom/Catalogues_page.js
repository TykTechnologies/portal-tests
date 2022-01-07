const Page = require('./Page');
const Button_object = require('ui_test_automation/wrappers/Button_object');
const Input_object = require('ui_test_automation/wrappers/Input_object');
const Table_object = require('../wrappers/portal_table_wrapper');
const Portal_dropDown_object = require('../wrappers/portal_dropDown_object');
const DropDown_object = require('ui_test_automation/wrappers/DropDown_object');

class Catalogues_page extends Page {
    get TABLE() {return new Table_object('table');}
    get ADD_BUTTON() {return new Button_object('a*=+ Add new Catalogue');}
    get SAVE_BUTTON() {return new Button_object('button*=Save');}
    get SAVE_CHANGES_BUTTON() {return new Button_object('button*=Save Changes');}
    get NAME_INPUT() {return new Input_object('input[name="QorResource.Name"]');}
    get PATH_INPUT() {return new Input_object('input[name="QorResource.NameWithSlug"]');}
    get VISIBILITY_DROPDOWN() {return new Portal_dropDown_object('//label[contains(text(),"Visibility options")]/..//span');}
    get ADD_AUDIENCE_BUTTON() {return new Button_object('button*=Add Team');}
    get TEAM_DROPDOWN() {return new DropDown_object('//label[contains(text(),"Team")]/..//span');}
    get PRODUCTS_DROPDOWN() {return new Portal_dropDown_object('//label[contains(text(),"Products")]/..//ul');}
    get PLANS_DROPDOWN() {return new Portal_dropDown_object('//label[contains(text(),"Plans")]/..//ul');}

    //DIALOG WINDOW
    get DIALOG_OK_BUTTON() {return new Button_object('button=ok');}


    checkIfPageIsOpened() {wdioExpect(this.ADD_BUTTON).toBeDisplayed();}

    addCatalogue(catalogueDetails) {
        this.ADD_BUTTON.click();
        this.NAME_INPUT.setValue(catalogueDetails.name);
        // this.PATH_INPUT.setValue(catalogueDetails.path);
        this.VISIBILITY_DROPDOWN.selectOption(catalogueDetails.visibility);
        if (catalogueDetails.team !== undefined) {
            if(!this.TEAM_DROPDOWN.isDisplayed()){
                this.ADD_AUDIENCE_BUTTON.click();
            }
            this.TEAM_DROPDOWN.selectOption(catalogueDetails.team);
        }
        this.PRODUCTS_DROPDOWN.clearSlection();
        (Array.isArray(catalogueDetails.products)) ? this.PRODUCTS_DROPDOWN.selectOptions(catalogueDetails.products) : this.PRODUCTS_DROPDOWN.selectOption(catalogueDetails.products);
        this.PLANS_DROPDOWN.clearSlection();
        (Array.isArray(catalogueDetails.plans)) ? this.PLANS_DROPDOWN.selectselectOptions(catalogueDetails.plans) : this.PLANS_DROPDOWN.selectOption(catalogueDetails.plans);
        this.SAVE_BUTTON.click();
    };
}
export const catalogues_page = new Catalogues_page();