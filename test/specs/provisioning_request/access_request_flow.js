if (process.env.DOCKER_EXECUTION) {
    console.log("Tests disabled in docker execution!!")
}
else {
    require('../../flowSteps/token_limits_flow');

    const appName = require('../../flowSteps/request_access');
    console.log(">>> Provisioning request created in: " + appName);
    require('../../flowSteps/approve_requets')(appName);
    require('../../flowSteps/using_token')(appName);
}


