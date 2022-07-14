const superagent = require('superagent');
const config_variables = require('../config_variables');
const Promise = require('bluebird');

const timeoutMs = 10000;

export class Keycloak_connection {
    constructor() {
        this.getTokenEndpoint = config_variables.KEYCLOAK_URL_TOKEN_ENDPOINT;
    }

    getToken(clientID, clientSecret, grantType = "client_credentials") { 
        const response = browser.call(() => this.sendPostRequestPromise(clientID, clientSecret, grantType).timeout(timeoutMs));
        console.log(`>>> Token from Keycloak: ${JSON.stringify(response.body)}`);
        expect(response.body).to.have.own.property('access_token');
        console.log(`>>> Token from Keycloak: ${response.body.access_token}`);
        return response.body.access_token;
    };

    checkIfClientWasDeleted(clientID, clientSecret, grantType = "client_credentials") {
        const response = browser.call(() => this.sendPostRequestPromise(clientID, clientSecret, grantType).timeout(timeoutMs));
        expect(response.status).to.be.equal(400);
    }
    
     sendPostRequestPromise(clientID, clientSecret, grantType = "client_credentials") {  
        return new Promise( (resolve, reject) => {
        console.debug(`>>> Sending request to ${this.getTokenEndpoint}`);
        console.debug(`>>> clientID: ${clientID}, clientSecret: ${clientSecret}`);
        superagent
        .post(this.getTokenEndpoint)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({ client_id: clientID })
        .send({ client_secret: clientSecret })
        .send({ grant_type: grantType })
        .disableTLSCerts()
        .ok(res => res.status < 500)
        .then((response) => {
            console.debug(`>>> response status: ${response.status}`);
            resolve(response);})
        .catch( err => {console.log(err, response.body); resolve(response);});        
        });
    };

}