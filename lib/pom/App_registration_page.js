const Page = require('./Page');
const Checkbox_object = require('ui_test_automation/wrappers/Checkbox_object');
const Input_object = require('ui_test_automation/wrappers/Input_object');
const Portal_dropDown_object = require('../wrappers/portal_dropDown_object');
const Button_object = require('ui_test_automation/wrappers/Button_object');

class App_registration_page extends Page {
    get SAVE_CHANGES_BUTTON() {return new Button_object('button*=Save Changes');}

    get PROVIDER_TYPE_DROPDOWN() {return new Portal_dropDown_object('#select2-dcr_config_1_name-container');}
    get WELL_KNOWN_URL_INPUT() {return new Input_object('textarea[name="QorResource.OIDCURL"]');}
    get ACCESS_TOKEN_INPUT() {return new Input_object('textarea[name="QorResource.RegistrationAccessToken"]');}
    get SSL_SKIP_VERIFY_CHECKBOX() {return new Checkbox_object('input[name="QorResource.SSLInsecureSkipVerify"]');}

    get ADD_CLIENT_TYPE_BUTTON() {return new Button_object('button*=Add Client Type');}
    newTypeInputPath = `//fieldset[@class="qor-fieldset"]/div[@class="qor-form-section clearfix "]//input[contains(@name, ".$name$")]`;
    newTypeDropDownPath = `//fieldset[@class="qor-fieldset"]/div[@class="qor-form-section clearfix "]//select[contains(@name, ".$name$")]/../span`;
    get TYPE_NAME_INPUT() {return new Input_object(this.newTypeInputPath.replace('$name$', 'Name'));}
    get TYPE_DESCRIPTION_INPUT() {return new Input_object(this.newTypeInputPath.replace('$name$', 'Description'));}
    get RESPONSE_TYPES_DROPDOWN() {return new Portal_dropDown_object(this.newTypeDropDownPath.replace('$name$', 'ResponseType'));}
    get GRANT_TYPES_DROPDOWN() {return new Portal_dropDown_object(this.newTypeDropDownPath.replace('$name$', 'GrantType'));}
    get TOKEN_ENDPOINT_DROPDOWN() {return new Portal_dropDown_object(this.newTypeDropDownPath.replace('$name$', 'TokenEndpoints'));}
    get OKTA_APPLICATION_TYPE_DROPDOWN() {return new Portal_dropDown_object(this.newTypeDropDownPath.replace('$name$', 'OktaAppType'));}


    addClientType(clientDetails) {
        this.ADD_CLIENT_TYPE_BUTTON.click();
        this.TYPE_NAME_INPUT.setValue(clientDetails.name);
        this.TYPE_DESCRIPTION_INPUT.setValue(clientDetails.description);
        (Array.isArray(clientDetails.response_types)) ? this.RESPONSE_TYPES_DROPDOWN.selectOptions(clientDetails.response_types) : this.RESPONSE_TYPES_DROPDOWN.selectOption(clientDetails.response_types);
        (Array.isArray(clientDetails.grant_types)) ? this.GRANT_TYPES_DROPDOWN.selectOptions(clientDetails.grant_types) : this.GRANT_TYPES_DROPDOWN.selectOption(clientDetails.grant_types);
        this.TOKEN_ENDPOINT_DROPDOWN.selectOption(clientDetails.token_endpoint);
        if (clientDetails.okta_app_type !== undefined) {
            this.OKTA_APPLICATION_TYPE_DROPDOWN.selectOption(clientDetails.okta_app_type);
        }
    }

    checkIfPageIsOpened() {wdioExpect(this.ADD_BUTTON).toBeDisplayed();}
}
export const app_registration_page = new App_registration_page();