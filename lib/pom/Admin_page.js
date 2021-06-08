const Page = require('./Page');
const Button_object = require('ui_test_automation/wrappers/Button_object');
import * as config_variables from '../../config_variables';
import { main_page } from './Main_page';

class Admin_page extends Page {
    get SECTION_TITLE_TEXT() {return $('.mdl-layout-title');}
    get VIEW_SITE_BUTTON() {return new Button_object('a*=View Site');}
    //USER MANAGMENT
    get USERS_BUTTON() {return new Button_object('a*=Users');}
    get ORGANIATIONS_BUTTON() {return new Button_object('a*=Organisations');}
    get SERVICES_BUTTON() {return new Button_object('a*=Services');}


    checkIfPageIsOpened() {wdioExpect(this.SECTION_TITLE_TEXT).toBeDisplayed();}

    openDashboard() {
        this.VIEW_SITE_BUTTON.click();
        browser.switchWindow("New Home Page page");
        console.log(`>> Switched to ${browser.getTitle()}`);
        main_page.APIS_BUTTON.waitForExist();
    }
}
export const admin_page = new Admin_page();