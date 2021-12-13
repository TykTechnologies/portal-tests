const Page = require('./Page');
const Checkbox_object = require('ui_test_automation/wrappers/Checkbox_object');
const Input_object = require('ui_test_automation/wrappers/Input_object');
const Table_object = require('../wrappers/raava_table_wrapper');

class Org_page extends Page {
    get TABLE() {return new Table_object('table');}
    //NEW ORG FORM
    get AUTO_APPROVE_CHECKBOX() {return new Checkbox_object('table');}
   

    checkIfPageIsOpened() {wdioExpect(this.ADD_BUTTON).toBeDisplayed();}
}
export const org_page = new Org_page();