const Page = require('./Page');
const Button_object = require('ui_test_automation/wrappers/Button_object');
const Input_object = require('ui_test_automation/wrappers/Input_object');
const Table_object = require('../wrappers/raava_table_wrapper');
const DropDown_object = require('ui_test_automation/wrappers/DropDown_object');

class Teams_page extends Page {
    get TABLE() {return new Table_object('table');}
    get ADD_BUTTON() {return new Button_object('a=Add');}
    get EDIT_BUTTON() {return new Button_object('.mdl-button__ripple-container');}
    //NEW ORG FORM
    get NAME_INPUT() {return new Input_object('input[name="QorResource.Name"]');}
    get ORG_DROPDOWN() {return new DropDown_object('#select2--container');}
    get SUBMIT_NEW_BUTTON() {return new Button_object('button=Save');}
    get SAVE_CHANGES_BUTTON() {return new Button_object('button*=Save Changes');}

    checkIfPageIsOpened() {wdioExpect(this.ADD_BUTTON).toBeDisplayed();}
}
export const teams_page = new Teams_page();