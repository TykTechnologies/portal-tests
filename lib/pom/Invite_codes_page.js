const Page = require('./Page');
const Button_object = require('ui_test_automation/wrappers/Button_object');
const Input_object = require('ui_test_automation/wrappers/Input_object');
const Checkbox_object = require('ui_test_automation/wrappers/Checkbox_object');
const DropDown_object = require('ui_test_automation/wrappers/DropDown_object');
const Table_object = require('../wrappers/raava_table_wrapper');

class Invite_codes_page extends Page {
    get TABLE() {return new Table_object('table');}
    get ADD_BUTTON() {return new Button_object('a*=+ Add new Invite Code');}
    //NEW INIVITE CODE FORM
    get QUOTA_INPUT() {return new Input_object('input[name="QorResource.Quota"]');}
    get EXPIRES_INPUT() {return new Input_object('input[name="QorResource.Expires"]');}
    get ACTIVE_CHECKBOX() {return new Checkbox_object('input[name="QorResource.Active"]');}
    get TEAMS_DROPDOWN() {return new DropDown_object('#select2--container');}
    get SAVE_BUTTON() {return new Button_object('button*=Save');}
    get SAVE_CHANGES_BUTTON() {return new Button_object('button*=Save Changes');}

    //TABLE HEADERS
    get codeTableHeader() { return 'Code';}

    checkIfPageIsOpened() {wdioExpect(this.ADD_BUTTON).toBeDisplayed();}

    fillNewInviteCodeForm(inviteCodeDetails) {
        this.QUOTA_INPUT.setValue(inviteCodeDetails.quota);
        this.EXPIRES_INPUT.setValue(inviteCodeDetails.expires);
        if(inviteCodeDetails.active){
            this.ACTIVE_CHECKBOX.check();
        }
        if (inviteCodeDetails.team !== undefined) {
            this.TEAMS_DROPDOWN.selectOption(inviteCodeDetails.team);
        }
    }

    getCodeFromRow(rowNumber) {
        return this.TABLE.getCellElement(rowNumber, this.codeTableHeader).getText();
    }

    deleteRowWithCode(code) {
        const rowNumber = this.TABLE.getRowNumberOfCellWithValue(code);
        console.log(`Deleting row: ${rowNumber}`);
        this.TABLE.deleteRow(rowNumber);
    }
}
export const invite_codes_page = new Invite_codes_page();