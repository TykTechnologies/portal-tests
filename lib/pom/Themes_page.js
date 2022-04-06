const Page = require('./Page');
const Button_object = require('ui_test_automation/wrappers/Button_object');
const Table_object = require('../wrappers/portal_table_wrapper');
const DropDown_object = require('ui_test_automation/wrappers/DropDown_object');

class Themes_page extends Page {
    get TABLE() {return new Table_object('table');}
    get ADD_BUTTON() {return new Button_object('a*=+ Add new Theme');}
    get SAVE_CHANGES_BUTTON() {return new Button_object('button*=Save Changes');}
    get SAVE_BUTTON() {return new Button_object('button*=Save');}
    get ADD_THEME_FILE_BUTTON() {return new Button_object('input[name="QorResource.ThemeFile"]');}
    get SUCCESS_MESSAGE_ALERT() { return $('span*=Themes was successfully created');}
    
    checkIfPageIsOpened() {wdioExpect(this.ADD_BUTTON).toBeDisplayed();}

    isThemeActive(themeName) {
        const rowNumber = themes_page.TABLE.getRowNumberOfCellWithValue(themeName);
        return this.getStatusOfThemeInRow(rowNumber) === 'Current';
    };

    isThemeNotActive(themeName) {
        const rowNumber = themes_page.TABLE.getRowNumberOfCellWithValue(themeName);
        const status = this.getStatusOfThemeInRow(rowNumber);
        console.log(`>>> Staus of theme ${themeName} is ${status}`);
        return status === 'Not in use';
    };

    activateTheme(themeName) {
        const rowNumber = themes_page.TABLE.getRowNumberOfCellWithValue(themeName);
        this.TABLE.clickActionOnRow(rowNumber, "Activate Theme");
        this.DIALOG_OK_BUTTON.click();
    };

    getStatusOfThemeInRow(rowNumber) {
        return this.TABLE.getCellElementByColumnNameAndRowNumber('Status', rowNumber).getText();
    };
}
export const themes_page = new Themes_page();