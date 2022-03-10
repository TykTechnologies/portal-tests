const superagent = require('superagent');
const config_variables = require('../config_variables');
const Promise = require('bluebird');

const timeoutMs = 10000;

export class Keycloak_connection {
    constructor() {
        this.url = config_variables.KEYCLOAK_URL;
        this.getTokenEndpoint = "auth/realms/master/protocol/openid-connect/token";
    }

    getToken(clientID, clientSecret, grantType = "client_credentials") { 
        const response = browser.call(() => this.sendPostRequestPromise(clientID, clientSecret, grantType).timeout(timeoutMs));
        console.log(`Token from Keycloak: ${response.body.access_token}`);
        return response;
    };
    
     sendPostRequestPromise(clientID, clientSecret, grantType = "client_credentials") {  
        return new Promise( (resolve, reject) => {
        console.debug(`>>> Sending request to ${this.url}${this.getTokenEndpoint}`);
        console.debug(`>>> clientID: ${clientID}, clientSecret: ${clientSecret}`);
        superagent
        .post(this.url + this.getTokenEndpoint)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({ client_id: clientID })
        .send({ client_secret: clientSecret })
        .send({ grant_type: grantType })
        .disableTLSCerts()
        .ok(res => res.status < 400)
        .then((response) => {
            console.debug(`>>> response status: ${response.status}`);
            resolve(response);})
        .catch( err => {console.log(err, response.body); resolve(response);});        
        });
    };

}