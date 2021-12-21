const Wrapper = require('ui_test_automation/wrappers/Wrapper');
const Button_object = require('ui_test_automation/wrappers/Button_object');

/**
 * Representing Live portal catalogue object
 * @class
 */
 class Portal_catalogue_card_object extends Wrapper {
    constructor(catalogue_name) {
      super(`h2=${catalogue_name}`);
      this.MORE_INFO_BUTTON = new Button_object(`a[href="/portal/catalogue-products/${catalogue_name}"]`);
      this.AUTH_TYPE_PILL = new Wrapper(`//h2[text()="${catalogue_name}"]/..//span[@class="pill"]`);
    }

    getName() { return this.$(this.selector).getText(); }

 }

module.exports = Portal_catalogue_card_object;
