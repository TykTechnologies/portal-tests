const Page = require('./Page');
const Button_object = require('ui_test_automation/wrappers/Button_object');
const DropDown_object = require('ui_test_automation/wrappers/DropDown_object');

class General_settings_page extends Page {
    get SUCCESS_MESSAGE_ALERT() { return $('div*=General was successfully updated');}
    get VISIBILITY_DROPDOWN() { return new DropDown_object('#select2-config_table_1_portal_state-container'); }
    get SAVE_CHANGES_BUTTON() { return new Button_object('button*=Save Changes'); }
    //checkbox without current status are treated as buttons
    get ENABLE_REGISTER_CHECKBOX() { return new Button_object('#config_table_1_registration_allow'); }
    get ENABLE_SIGN_IN_CHECKBOX() { return new Button_object('#config_table_1_login_enabled'); }
    get ENABLE_AUTOAPPROVE_REGISTER_CHECKBOX() { return new Button_object('#config_table_1_registration_auto_approve'); }
}
export const general_settings_page = new General_settings_page();