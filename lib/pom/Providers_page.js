const Page = require('./Page');
const Button_object = require('ui_test_automation/wrappers/Button_object');
const Input_object = require('ui_test_automation/wrappers/Input_object');
const Table_object = require('../wrappers/raava_table_wrapper');

class Providers_page extends Page {
    get productsDataHeading() {return "ProductCount";}
    get plansDataHeading() {return "PlanCount";}

    get TABLE() {return new Table_object('table');}
    get ADD_BUTTON() {return new Button_object('a*=+ Add new Provider');}
    get SYNCHRONIZE_BUTTON() {return new Button_object('a*=Synchronize');}
    get EDIT_BUTTON() {return new Button_object('.qor-button--edit');}
    //NEW/EDIT ORG FORM
    // get EDIT_BUTTON() {return new Button_object('a*=Continue on edit');}
    get NAME_INPUT() {return new Input_object('input[name="QorResource.Name"]');}
    get URL_INPUT() {return new Input_object('#-URL');}
    get SECRET_INPUT() {return new Input_object('#-Secret');}
    get ORG_ID_INPUT() {return new Input_object('#-OrgID');}
    get POLICIES_TAGS_INPUT() {return new Input_object('#-PoliciesTagsFlat');}
    get SAVE_BUTTON() {return new Button_object('button=Save');}
    get SAVE_CHANGES_BUTTON() {return new Button_object('button*=Save Changes');}

    //DIALOG WINDOW
    get DIALOG_OK_BUTTON() {return new Button_object('button=ok');}


    checkIfPageIsOpened() {wdioExpect(this.ADD_BUTTON).toBeDisplayed();}

    getTabelProductsCellFromRow(rowNumber) {
        return this.TABLE.getCellElementByColumnNameAndRowNumber(this.productsDataHeading, rowNumber);
    }

    getTabelPlansCellFromRow(rowNumber) {
        return this.TABLE.getCellElementByColumnNameAndRowNumber(this.plansDataHeading, rowNumber);
    }

    addProvider(providerDetails) {
        this.ADD_BUTTON.click();
        this.NAME_INPUT.waitForClickable();
        this.NAME_INPUT.setValue(providerDetails.name);
        this.URL_INPUT.setValue(providerDetails.url);
        this.SECRET_INPUT.setValue(providerDetails.secret);
        this.ORG_ID_INPUT.setValue(providerDetails.org_id);
        this.SAVE_BUTTON.click();
    }
}
export const providers_page = new Providers_page();