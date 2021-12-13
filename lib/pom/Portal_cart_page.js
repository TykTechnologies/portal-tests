const Page = require('./Page');
const Button_object = require('ui_test_automation/wrappers/Button_object');
const DropDown_object = require('ui_test_automation/wrappers/DropDown_object');
const Input_object = require('ui_test_automation/wrappers/Input_object');

class Portal_cart_page extends Page {
    get SELECT_A_PLAN_DROPDOWN() { return new DropDown_object('#exampleFormControlSelect-1'); }
    get CREATE_NEW_APP_BUTTON() { return new Button_object('input[value="create"]'); }
    get SUBMIT_REQUEST_BUTTON() { return new Button_object('button*=Submit request'); }
    get GO_TO_MY_APPS_BUTTON() { return new Button_object('a*=go to My Apps'); }

    //NEW APP FORM
    get APP_NAME_INPUT() { return new Input_object('input[placeholder="App Name"]'); }
    get DESCRIPTION_INPUT() { return new Input_object('textarea[placeholder="App Description"]'); }
    get REDIRECT_URLS_INPUT() { return new Input_object('input[placeholder="Redirect URLs"]'); }

    checkIfPageIsOpened() { wdioExpect(this.ADD_TO_CART_BUTTON).toBeDisplayed(); }
}
export const portal_cart_page = new Portal_cart_page();