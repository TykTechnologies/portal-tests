import { login_page } from '../../../lib/pom/Login_page';
import { admin_page } from '../../../lib/pom/Admin_page';
import { themes_page } from '../../../lib/pom/Themes_page';

const path = require('path');
const fs = require('fs');
const expectedFilePath = path.join(downloadDir, "default.zip");

describe('Downloading theme', () => {
  const defaultThemeName = 'default';
  const expectedFileSize = 863255;

  before(() => {
    login_page.open();
    login_page.login();
    if (!fs.existsSync(global.downloadDir)){ //making sure that download dir exists
      fs.mkdirSync(global.downloadDir);
  }
  });

  it('Admin should be able to download default Theme', () => {
    admin_page.THEMES_BUTTON.click();
    const rowNumber = themes_page.TABLE.getRowNumberOfCellWithValue(defaultThemeName);
    themes_page.TABLE.clickActionOnRow(rowNumber, "Download");
  });

  it('Theme was download as default.zip file', () => {
    waitUntilFileDownloaded();
    expect(fs.existsSync(expectedFilePath)).to.be.true;
  });

  it('Downloaded file should not be empty', () => {
    var stats = fs.statSync(expectedFilePath);
    var fileSizeInBytes = stats.size;
    expect(fileSizeInBytes).to.equal(expectedFileSize);
  });

});

const waitUntilFileDownloaded = () => {
  let checkCount = 1;
  while(checkCount < 20, checkCount++) {
    if (fs.existsSync(expectedFilePath)) {
      return;
    }
    browser.pause(2000);
  }
};