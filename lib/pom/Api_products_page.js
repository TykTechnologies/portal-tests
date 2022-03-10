const Page = require('./Page');
const Checkbox_object = require('ui_test_automation/wrappers/Checkbox_object');
const Input_object = require('ui_test_automation/wrappers/Input_object');
const Portal_dropDown_object = require('../wrappers/portal_dropDown_object');
const Button_object = require('ui_test_automation/wrappers/Button_object');
const Table_object = require('../wrappers/portal_table_wrapper');

class Api_products_page extends Page {
    get TABLE() {return new Table_object('table');}
    //PRODUCT FORM
    get SAVE_CHANGES_BUTTON() {return new Button_object('button*=Save Changes');}
    get ENABLE_DCR_CHECKBOX() {return new Checkbox_object('input[name="QorResource.DCREnabled"]');}
    get SCOPES_INPUT() {return new Input_object('input[name="QorResource.Scopes"]');}
    get CLIENTS_TYPES_DROPDOWN() {return new Portal_dropDown_object('//div[@data-section-title="App registration configs"]//ul[@class="select2-selection__rendered"]');}

   

    checkIfPageIsOpened() {wdioExpect(this.ADD_BUTTON).toBeDisplayed();}
}
export const api_products_page = new Api_products_page();