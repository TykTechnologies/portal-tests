const Page = require('./Page');
const Button_object = require('ui_test_automation/wrappers/Button_object');

class Admin_page extends Page {
    get WELCOME_SECTION_HEAD() { return $('h1*=Build the future with Tyk APIs'); }
    get EXPLORE_API_PRODUCTS_BUTTON() { return new Button_object('a*=EXPLORE API PRODUCTS'); }
    get GETTING_STARTED_SECTION_HEAD() { return $('h2*=Getting Started'); }
    get ABOUT_TYK_SECTION_HEAD() { return $('h2*=About Tyk'); }
    get READ_MORE_BUTTON() { return new Button_object('a*=Read more'); }
}
export const welcome_page = new Admin_page();