import { TYK_GW_SECRET, GW_URL, TYK_SECRET, URL } from '../config_variables';
const superagent = require('superagent');
const Promise = require('bluebird');

const timeoutMs = 5000;

export class Gateway_connection {
    constructor() {
        this.secret = TYK_GW_SECRET;
        this.url = GW_URL;
    }

    waitUntilGWisUp() {
        browser.waitUntil(() => this.isGWup(), {timeout: 60000, timeoutMsg: "GW is down!"});
        console.log('GW is up');
    }

    isGWup() {
        const config = {
            path: "hello",
            headers: {}
        };
        const response = browser.call(() => this.sendGetRequestPromise(config).timeout(timeoutMs));
console.log(response.body)
const config1 ={
    path: "api/apis",
            headers: {"Authorization": `${TYK_SECRET}`}
}
        this.url = "http://localhost:3005/";
        const response1 = browser.call(() => this.sendGetRequestPromise(config1).timeout(timeoutMs));
        
        console.log(response1.status)
        console.log(response1.body)
        console.log(`GW status: ${response.body.status}`);
        return response.body.status === "pass";
    }

    sendGetRequestPromise(config) {  
        return new Promise( (resolve, reject) => {
        console.debug(`>>> Sending request to ${this.url}${config.path}`);
        superagent
        .get(this.url + config.path)
        .set(config.headers)
        .disableTLSCerts()
        .then((response) => {
            console.debug(`>>> response status: ${response.status}`);
            resolve(response);})
        .catch( err => {console.log(err); reject;});
        
        });
    };

}