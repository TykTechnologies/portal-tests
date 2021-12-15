const Page = require('./Page');
const Button_object = require('ui_test_automation/wrappers/Button_object');
const DropDown_object = require('ui_test_automation/wrappers/DropDown_object');

class Dev_products_page extends Page {
    get ADD_TO_CART_BUTTON() { return new Button_object('button=Add to Cart'); }
    get GO_TO_CART_CONFIRM_BUTTON() { return new Button_object('a*=Go to cart'); }

    checkIfPageIsOpened() { wdioExpect(this.ADD_TO_CART_BUTTON).toBeDisplayed(); }

}
export const dev_products_page = new Dev_products_page();