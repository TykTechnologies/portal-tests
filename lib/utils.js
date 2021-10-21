const superagent = require('superagent');
import moment from 'moment';
import { DASHBOARD_ADMIN_API, TYK_ADMIN_SECRET, USERS_PATH } from '../config_variables';

export const getTimeStamp = () => {
  return moment().format('D-MMM-h_mm_ss');
};

export const createNewTykUser = (requestBody, header) => {
  console.log(`>>> Creating new Tyk user: ${requestBody}`);
  const response = browser.call(() => sendPostRequestPromise(requestBody, header));
  return response;
};

function sendPostRequestPromise(requestBody, header) {
  const url = DASHBOARD_ADMIN_API + USERS_PATH;
  return new Promise( (resolve, reject) => {
  console.debug(`>>> Sending request to ${url}, headers: ${JSON.stringify(header)}`);
  superagent
  .post(url)
  .send(requestBody)
  .set('admin-auth',`${TYK_ADMIN_SECRET}`)
  .disableTLSCerts()
  .then((response) => {
      console.debug(`>>> response status: ${response.status}, response body: ${JSON.stringify(response.body)}`);
      resolve(response.body.Message);})
  .catch( err => {console.log(err);});  
  });
};