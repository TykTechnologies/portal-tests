const superagent = require('superagent');
const config_variables = require('../config_variables');
const Promise = require('bluebird');

const timeoutMs = 10000;

export class GW_connection {
    constructor() {
        this.url = config_variables.TYK_GW_URL;
        this.endPointToTest = "/ip";
    }

    expectTokenWorksWithGW(apiName, token) {
        const response = this.sendGetRequestWithToken(apiName, token);
        expect(response.statusCode).to.equal(200);
    }

    sendGetRequestWithToken(apiName, token) {
        const config = {
            path: apiName + this.endPointToTest,
            headers: { Authorization: token }
        };
        return this.sendGetRequest(config);
    }
    
    sendGetRequest(config) {
        console.debug(`>>> Sending GET request to ${this.url}${config.path}`);
        const response = browser.call(() => this.sendGetRequestPromise(config).timeout(timeoutMs));
        return response;
    };

    sendGetRequestPromise(config) {  
        return new Promise( (resolve, reject) => {
        console.debug(`>>> Sending request to ${this.url}${config.path}`);
        superagent
        .get(this.url + config.path)
        .set(config.headers)
        .disableTLSCerts()
        .ok(res => res.status < 500)
        .then((response) => {
            console.debug(`>>> response status: ${response.status}`);
            resolve(response);})
        .catch( err => {console.log(err); resolve(response);});
        
        });
    };

}