const Page = require('./Page');
const Button_object = require('ui_test_automation/wrappers/Button_object');
const Input_object = require('ui_test_automation/wrappers/Input_object');
const Table_object = require('../wrappers/raava_table_wrapper');

class Org_page extends Page {
    get TABLE() {return new Table_object('table');}
    get PLUS_BUTTON() {return new Button_object('i=add');}
    //NEW ORG FORM
    get NAME_INPUT() {return new Input_object('input[name="QorResource.Name"]');}
    get ADD_BUTTON() {return new Button_object('button[type="submit"]');}
    get SAVE_CHANGES_BUTTON() {return new Button_object('button*=Save Changes');}

    checkIfPageIsOpened() {wdioExpect(this.PLUS_BUTTON).toBeDisplayed();}
}
export const org_page = new Org_page();