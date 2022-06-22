import { login_page } from '../../../lib/pom/Login_page';
import { admin_page } from '../../../lib/pom/Admin_page';
import { themes_page } from '../../../lib/pom/Themes_page';
import { URL } from '../../../config_variables';
const path = require('path');

describe('Uploading theme and making it active', () => {
  const zipFileRelativePath = "./test-theme.zip";
  const themeName = 'test-theme';
  const defaultThemeName = 'default';
  const cataloguesURLPath = URL + "portal/catalogue-products";
  
  before(() => {
    login_page.open();
    login_page.login();
  });

  it('Admin should be able to upload new Theme', () => {
    admin_page.THEMES_BUTTON.click();
    //make sure that theme is not already there
    themes_page.TABLE.expectCellWithTextNotToBeDisplayed(themeName);
    themes_page.ADD_BUTTON.click();
    uploadZipFile();
    themes_page.SAVE_BUTTON.click();
    wdioExpect(themes_page.SUCCESS_MESSAGE_ALERT).toBeDisplayed();
  });

  it('New theme is visible in the Team table', () => {
    themes_page.TABLE.expectCellWithTextToBeDisplayed(themeName);
  });

  it('New Theame was not set as Current', () => {
    expect(themes_page.isThemeNotActive(themeName)).to.be.true;
  });

  it('Admin is able to set new theme as Current', () => {
    themes_page.activateTheme(themeName);
    expect(themes_page.isThemeActive(themeName)).to.be.true;
  });

  it('Changes in current theme are visible in UI', () => {
    browser.url(cataloguesURLPath);
    wdioExpect($('h1*=Product Catalogues TEST THEME v1.0.1')).toBeDisplayed(); //"Test Theme" was added in theme
  });

  it('Admin is able to change change theme back to default', () => {
    browser.back();
    themes_page.activateTheme(defaultThemeName);
    browser.url(cataloguesURLPath);
    wdioExpect($('h1*=Product Catalogues Test Theme')).not.toBeDisplayed();
    wdioExpect($('h1*=Product Catalogues')).toBeDisplayed();
  });

  const uploadZipFile = () => {
    const filePath = path.join(__dirname, zipFileRelativePath);
    console.log(`>>> Uploading theme file from path: ${filePath}`);
    const remoteFilePath = browser.uploadFile(filePath);
    themes_page.ADD_THEME_FILE_BUTTON.setValue(remoteFilePath);
  };


  
});