const Page = require('./Page');
const Button_object = require('ui_test_automation/wrappers/Button_object');
const Input_object = require('ui_test_automation/wrappers/Input_object');
const Checkbox_object = require('ui_test_automation/wrappers/Checkbox_object');
const DropDown_object = require('ui_test_automation/wrappers/DropDown_object');
const Table_object = require('../wrappers/raava_table_wrapper');

class Api_consumers_page extends Page {
    get TABLE() { return new Table_object('table'); }
    get ADD_BUTTON() { return new Button_object('a=Add'); }
    //NEW USER FORM
    get FIRST_NAME_INPUT() { return new Input_object('input[name="QorResource.First"]'); }
    get LAST_NAME_INPUT() { return new Input_object('input[name="QorResource.Last"]'); }
    get EMAIL_INPUT() { return new Input_object('input[name="QorResource.Email"]'); }
    get ORG_DROPDOWN() { return new DropDown_object('#select2--container'); }
    get TEAMS_DROPDOWN() { return new DropDown_object('select2--container'); }
    get SAVE_BUTTON() { return new Button_object('button*=Save'); }
    get SAVE_CHANGES_BUTTON() { return new Button_object('button*=Save Changes'); }

    checkIfPageIsOpened() { wdioExpect(this.ADD_BUTTON).toBeDisplayed(); }

    fillNewUserForm(userDetails) {
        this.FIRST_NAME_INPUT.setValue(userDetails.first);
        this.LAST_NAME_INPUT.setValue(userDetails.last);
        this.EMAIL_INPUT.setValue(userDetails.email);
        this.ORG_DROPDOWN.selectOption(userDetails.org);
    }
}
export const api_consumers_page = new Api_consumers_page();