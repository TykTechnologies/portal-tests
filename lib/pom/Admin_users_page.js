const Page = require('./Page');
const Button_object = require('ui_test_automation/wrappers/Button_object');
const Input_object = require('ui_test_automation/wrappers/Input_object');
const Table_object = require('../wrappers/portal_table_wrapper');

class Admin_users_page extends Page {
    get TABLE() { return new Table_object('table'); }
    get ADD_BUTTON() { return new Button_object('a*=+ Add new Admin User'); }
    //NEW USER FORM
    get FIRST_NAME_INPUT() { return new Input_object('input[name="QorResource.First"]'); }
    get LAST_NAME_INPUT() { return new Input_object('input[name="QorResource.Last"]'); }
    get EMAIL_INPUT() { return new Input_object('input[name="QorResource.Email"]'); }
    get ACTIVE_CHECKBOX() { return $('label*=Active'); }
    get SAVE_BUTTON() { return new Button_object('button*=Save'); }
    get SAVE_CHANGES_BUTTON() { return new Button_object('button*=Save Changes'); }


    checkIfPageIsOpened() { wdioExpect(this.ADD_BUTTON).toBeDisplayed(); }

    fillNewUserForm(userDetails) {
        this.FIRST_NAME_INPUT.setValue(userDetails.first);
        this.LAST_NAME_INPUT.setValue(userDetails.last);
        this.EMAIL_INPUT.setValue(userDetails.email);
        // checkbox removed from form
        // if (userDetails.isActive) {
        //     this.ACTIVE_CHECKBOX.click();
        // }
    }
}
export const admin_users_page = new Admin_users_page();