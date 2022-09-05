const superagent = require('superagent');
const config_variables = require('../../config_variables');
const Promise = require('bluebird');

const timeoutMs = 10000;
const linkRegExp = /http:\/\/localhost:3001\/auth\/password\/register\?token=.{32}/g;

export class Email_server_connection {
    constructor() {
        this.url = config_variables.EMAIL_SERVER_API_URL;
        this.messageEndpointPath = "/api/v2/messages";
        this.deleteMessageEndpointPath = "/api/v1/messages";
    }

    getLastEmailFromServer() {
        let responseText = this.getMessages();
        let attempt = 0;
        while(responseText.total < 1 && attempt < 20) {
            browser.pause(1000);
            console.log(`>>> Requesting for emails, attempt: ${attempt}, emails received: ${responseText.total}`);
            responseText = this.getMessages();
            attempt++;
        }
        if (responseText.total < 1) {
            throw new Error("Email server sis NOT received the email from!");
        }
        const message = responseText.items[0];
        console.log(`Email text: ${message.Content.Body}`);
        let readableMessage = message.Content.Body.replace("token=3D", "token=")
            .replace(/=[\r\n]{2}/,"");
        let link = readableMessage.match(linkRegExp)[0];
        return {
            to: message.Content.Headers.To[0].replace(/[<|>]/g, ""),
            from: message.Content.Headers.From[0].replace(/[<|>]/g, ""),
            subject: message.Content.Headers.Subject[0],
            body: message.Content.Body,
            link: link
        };
    };

    getMessages() {
        const response = this.sendGetRequest(this.messageEndpointPath);
        return JSON.parse(response.text);
    }


    sendGetRequest(path) {
        console.debug(`>>> Sending GET request to email server ${path}`);
        const response = browser.call(() => this.sendGetRequestPromise(path).timeout(timeoutMs));
        return response;
    };

    sendGetRequestPromise(path) {  
        return new Promise( (resolve, reject) => {
        console.debug(`>>> Sending request to email server ${path}`);
        superagent
        .get(this.url + path)
        .ok(res => res.status < 500)
        .then((response) => {
            console.debug(`>>> response status: ${response.status}`);
            resolve(response);})
        .catch( err => {console.log(err); resolve(response);});        
        });
    };

    deleteAllMessages() {
        return browser.call(() => new Promise( (resolve, reject) => {
            console.debug(`>>> Sending delete request to email server ${this.deleteMessageEndpointPath}`);
            superagent
            .delete(this.url + this.deleteMessageEndpointPath)
            .send()
            .ok(res => res.status < 500)
            .then((response) => {
                console.debug(`>>> response status: ${response.status}`);
                resolve(response);})
            .catch( err => {console.log(err); resolve(response);});        
            }).timeout(timeoutMs)
        );
    }
}