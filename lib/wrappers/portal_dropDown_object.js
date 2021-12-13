const DropDown_object = require('ui_test_automation/wrappers/DropDown_object');
const Button_object = require('ui_test_automation/wrappers/Button_object');

/**
 * Representing Raava table object
 * @class
 */
 class Portal_dropDown_object extends DropDown_object {
    constructor(selector) {
      super(selector);
    }

/**
 * selecting option.
 * function will open dropDown list and click on element with provided text
 * @param {String} option text
 * @function
 */
  selectOption(text) {
    console.log(`>>> Selecting option: ${this.optionTagName}*=${text} in ${this.selector}`);
    const optionElement = $(`${this.optionTagName}=${text}`);
    this.element.waitForExist();
    this.element.click();
    browser.pause(1000);
    if (optionElement.isClickable()) {
      optionElement.click();
      return;
    }
    this.element.click();
    optionElement.click();
  }

    clearSlection() {
     $(this.selector).$$('.select2-selection__choice__remove').forEach( x_button => {
        x_button.click();
     });   
    }
 }

module.exports = Portal_dropDown_object;
