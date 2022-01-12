import { DEV_A1_EMAIL, DEV_PASS} from '../../../config_variables';
browser.pause(60000)
const appNameLimits = require('../../flowSteps/request_access')(DEV_A1_EMAIL, DEV_PASS);
console.log(">>> Provisioning request created in: " + appNameLimits);
require('../../flowSteps/approve_requets')(appNameLimits);
require('../../flowSteps/token_limits')(appNameLimits);

// const appName = require('../../flowSteps/request_access');
// console.log(">>> Provisioning request created in: " + appName);
// require('../../flowSteps/approve_requets')(appName);
// require('../../flowSteps/using_token')(appName);
