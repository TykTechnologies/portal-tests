const Page = require('./Page');
const Button_object = require('ui_test_automation/wrappers/Button_object');
const Input_object = require('ui_test_automation/wrappers/Input_object');
const Table_object = require('../wrappers/portal_table_wrapper');

class Provisioning_requests_page extends Page {
    get TABLE() {return new Table_object('table');}
    get APPROVE_BUTTON() {return new Button_object('//div[@class="qor-form__actions"]//a[contains(text(),"Approve")]');}
    get REJECT_BUTTON() {return new Button_object('//div[@class="qor-form__actions"]//a[contains(text(),"Reject")]');}
    get OK_BUTTON() {return new Button_object('button*=ok');}
    get STATUS_LABEL() { return new Button_object('//label[contains(text(),"Status")]/../..//div[@class="qor-field__edit"]');}
    get APPROVE_SUCCESS_MESSAGE() {return $('span*=Executed successfully');}

    checkIfPageIsOpened() {wdioExpect(this.ADD_BUTTON).toBeDisplayed();}

    expectRequestToHaveApproveState() {
        wdioExpect(this.STATUS_LABEL).toHaveText('approved');
    };
}
export const provisioning_requests_page = new Provisioning_requests_page();