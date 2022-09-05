const Page = require('./Page');
const Button_object = require('ui_test_automation/wrappers/Button_object');
const Input_object = require('ui_test_automation/wrappers/Input_object');
const Checkbox_object = require('ui_test_automation/wrappers/Checkbox_object');
const DropDown_object = require('ui_test_automation/wrappers/DropDown_object');
const Table_object = require('../wrappers/portal_table_wrapper');

class Api_consumers_page extends Page {
    get INVITE_SEND_SUCCESS_ALERT() { return $('div*=Action Send invite: Executed successfully');}
    get TABLE() { return new Table_object('table'); }
    get ADD_BUTTON() { return new Button_object('a*=+ Add new User'); }
    //NEW USER FORM
    get FIRST_NAME_INPUT() { return new Input_object('input[name="QorResource.First"]'); }
    get LAST_NAME_INPUT() { return new Input_object('input[name="QorResource.Last"]'); }
    get EMAIL_INPUT() { return new Input_object('input[name="QorResource.Email"]'); }
    get ORG_DROPDOWN() { return new DropDown_object('#select2--container'); }
    get TEAMS_DROPDOWN() { return new DropDown_object('select2--container'); }
    get SEND_INVITE_BUTTON() { return new Button_object('//div[@class="qor-action-forms"]/a[contains(text(),"Send Invite")]'); }
    get SAVE_BUTTON() { return new Button_object('button*=Save'); }
    get SAVE_CHANGES_BUTTON() { return new Button_object('button*=Save Changes'); }
    get OK_BUTTON() { return new Button_object('button=ok'); }

    checkIfPageIsOpened() { wdioExpect(this.ADD_BUTTON).toBeDisplayed(); }

    fillNewUserForm(userDetails) {
        this.FIRST_NAME_INPUT.setValue(userDetails.first);
        this.LAST_NAME_INPUT.setValue(userDetails.last);
        this.ORG_DROPDOWN.selectOption(userDetails.org);
        this.EMAIL_INPUT.setValue(userDetails.email);
    }

    approveRequestWithEmail(userEmail) {
        const activateActionName = "Activate";
        const rowNumber = this.TABLE.getRowNumberOfCellWithValue(userEmail);
        this.TABLE.clickActionOnRow(rowNumber, activateActionName);
        this.OK_BUTTON.click();
        browser.pause(2000);
        expect(this.TABLE.getCellElementByColumnNameAndRowNumber("Activate", rowNumber).getText()).equal("Active");
    };
}
export const api_consumers_page = new Api_consumers_page();