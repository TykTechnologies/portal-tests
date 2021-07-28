const Page = require('./Page');
const Button_object = require('ui_test_automation/wrappers/Button_object');
const Input_object = require('ui_test_automation/wrappers/Input_object');
const Table_object = require('../wrappers/raava_table_wrapper');

class Providers_page extends Page {
    get serviceDataHeading() {return "ServicesAssociated";}
    get tiersDataHeading() {return "ServiceTiers";}

    get TABLE() {return new Table_object('table');}
    get ADD_BUTTON() {return new Button_object('a=Add');}
    get SYNCHRONIZE_BUTTON() {return new Button_object('a*=Synchronize');}
    get EDIT_BUTTON() {return new Button_object('.qor-button--edit');}
    //NEW/EDIT ORG FORM
    get EDIT_BUTTON() {return new Button_object('.mdl-button__ripple-container');}
    get NAME_INPUT() {return new Input_object('input[name="QorResource.Name"]');}
    get TYPE_INPUT() {return new Input_object('input[name="QorResource.Type"]');}
    get METADATA_INPUT() {return new Input_object('input[name="QorResource.Configuration.MetaData"]');}
    get SAVE_BUTTON() {return new Button_object('button=Save');}
    get SAVE_CHANGES_BUTTON() {return new Button_object('button*=Save Changes');}

    //DIALOG WINDOW
    get DIALOG_OK_BUTTON() {return new Button_object('button=ok');}


    checkIfPageIsOpened() {wdioExpect(this.ADD_BUTTON).toBeDisplayed();}

    getTabelServiceCellFromRow(rowNumber) {
        return this.TABLE.getCellElementByColumnNameAndRowNumber(this.serviceDataHeading, rowNumber);
    }

    getTabelTiersCellFromRow(rowNumber) {
        return this.TABLE.getCellElementByColumnNameAndRowNumber(this.tiersDataHeading, rowNumber);
    }
}
export const providers_page = new Providers_page();