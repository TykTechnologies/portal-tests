const Button_object = require('ui_test_automation/wrappers/Button_object');

class Page {
  
  get DIALOG_OK_BUTTON() {return new Button_object('button=ok');}

    constructor() {
      console.debug('>>> Creating new page object model');
    }
  
    open(path) {
      console.log('>> Opening page ' + path);
      browser.url(path);
    }
  
    waitUntilPageLoaded(webElementOnPage, timeout) {
      return webElementOnPage.waitForExist({ timeout: timeout, timeoutMsg: 'Page not loaded! Element not visible!'});
    }

  }
  
  module.exports = Page;