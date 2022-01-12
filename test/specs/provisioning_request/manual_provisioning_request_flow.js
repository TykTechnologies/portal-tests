import { DEV_A_EMAIL, DEV_PASS} from '../../../config_variables';

const appName = require('../../flowSteps/request_access')(DEV_A_EMAIL, DEV_PASS);
console.log(">>> Provisioning request created in: " + appName);
require('../../flowSteps/approve_requets')(appName);
require('../../flowSteps/using_token')(appName);

