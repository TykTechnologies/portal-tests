import { DEV_A1_EMAIL, DEV_PASS} from '../../../config_variables';
const appNameLimits = require('../../flowSteps/request_access_limits')(DEV_A1_EMAIL, DEV_PASS);
console.log(">>> Provisioning request created in: " + appNameLimits);
require('../../flowSteps/approve_requets')(appNameLimits);
require('../../flowSteps/token_limits')(appNameLimits);

// const appName = require('../../flowSteps/request_access');
// console.log(">>> Provisioning request created in: " + appName);
// require('../../flowSteps/approve_requets')(appName);
// require('../../flowSteps/using_token')(appName);
