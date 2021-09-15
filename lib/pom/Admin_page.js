const Page = require('./Page');
const Button_object = require('ui_test_automation/wrappers/Button_object');
import * as config_variables from '../../config_variables';
import { main_page } from './Main_page';

class Admin_page extends Page {
    get SECTION_TITLE_TEXT() { return $('.mdl-layout-title'); }
    get VIEW_SITE_BUTTON() { return new Button_object('a*=Live portal '); }
    //USER MANAGMENT
    get ORGANIATIONS_BUTTON() { return new Button_object('a*=Organisations'); }
    get TEAMS_BUTTON() { return new Button_object('a*=Teams'); }
    get ADMIN_USERS_BUTTON() { return new Button_object('a*=Admin Users'); }
    get API_CONSUMERS_BUTTON() { return new Button_object('a*=Users'); }
    get INVITE_CODES_BUTTON() {return new Button_object('a*=Invite Codes');}
    get PROVIDERS_BUTTON() { return new Button_object('a=Providers'); }
    get SERVICES_BUTTON() { return new Button_object('a*=Services'); }

    checkIfPageIsOpened() { wdioExpect(this.SECTION_TITLE_TEXT).toBeDisplayed(); }

    openDashboard() {
        this.VIEW_SITE_BUTTON.click();
        browser.switchWindow(/http:\/\/localhost:3001\/$/ig); //TODO change after adding title
        console.log(`>> Switched to ${browser.getTitle()}`);
        main_page.APIS_BUTTON.waitForExist();
    }

    logOut() {
        console.log(">>> Performing logout");
        browser.url(config_variables.URL + 'auth/logout');
        $('a=Register').waitForExist();
    }
}
export const admin_page = new Admin_page();