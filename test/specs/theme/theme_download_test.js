import { login_page } from '../../../lib/pom/Login_page';
import { admin_page } from '../../../lib/pom/Admin_page';
import { themes_page } from '../../../lib/pom/Themes_page';

const path = require('path');
const fs = require('fs');
const expectedFilePath = path.join(global.downloadDir, "default.zip");

describe('Downloading theme', () => {
  const defaultThemeName = 'default';

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
    if (process.env.DOCKER_EXECUTION) {
      return;
    };
    waitUntilFileDownloaded();
    expect(fs.existsSync(expectedFilePath)).to.be.true;
  });

  it('Downloaded file should not be empty', () => {
    if (process.env.DOCKER_EXECUTION) {
      return;
    };
    const stats = fs.statSync(expectedFilePath);
    const fileSizeInBytes = stats.size;
    //checking if file size is greater than 1000bytes
    expect(fileSizeInBytes).to.be.above(1000, ".zip file seems to be too small");
  });

});

const waitUntilFileDownloaded = () => {
  let checkCount = 1;
  while(checkCount < 20) {
    if (fs.existsSync(expectedFilePath)) {
      return;
    }
    console.log(`>>> Waiting until file is saved on drive, attempt: ${checkCount}`);
    browser.pause(2000);
    checkCount++;
  }
};