const Wrapper = require('ui_test_automation/wrappers/Wrapper');
const Button_object = require('ui_test_automation/wrappers/Button_object');

/**
 * Representing Live portal provisioning request card object
 * @class
 */
 class Portal_provisioning_request_card_object extends Wrapper {
    constructor(selector) {
      super(selector);
      this.ROTATE_BUTTON = $('button*=Rotate');
      this.REVOKE_BUTTON = $('button*=Revoke');
      this.TOKEN_ID_LABEL = $(this.selector).$('//strong[text()="Token ID"]/../..//input ');
      this.HASH_ID_LABEL = $(this.selector).$('//strong[text()="Hash"]/../..//input ');
      this.EXPIRY_LABEL = $(this.selector).$('//strong[text()="Expires:"]/../..//input ');
      // this.STATUS_LABEL = $(this.selector).$('span');
      this.API_PRODUCT_LINK = $(this.selector).$('.product-name');
      this.PLAN_NAME_LABEL = $(this.selector).$('.card-footer__plan-title');
      this.QUOTA_LABEL = $(this.selector).$('.card-footer__plan-details').$$('p')[0];
      this.QRATE_LIMIT_LABEL = $(this.selector).$('.card-footer__plan-details').$$('p')[1];
    }

    getToken() {
      const token = this.TOKEN_ID_LABEL.getValue();
      console.log(`>>> Token from request: ${token}`);
      return token;
    }

    expectPendingState() {
      wdioExpect(this.HASH_ID_LABEL).not.toBeDisplayed();
    };

    expectApprovedState() {
      wdioExpect(this.HASH_ID_LABEL).toBeDisplayed();
    };

    exepctPendingInfoToBeDisplayed() {
      wdioExpect($(this.selector).$('i*=Access credentials will appear here when the request has been approved'))
        .toBeDisplayed();
    };

    getName() { return this.$(this.selector).getText(); }

 }

module.exports = Portal_provisioning_request_card_object;
