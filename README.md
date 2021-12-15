# Portal-test
UI automated tests for Portal

test coverage can be found [here](coverage.md)

## How to run tests
1. Clone repository
2. Install Dependencies
```
'npm install'
```
4. Execute tests using 
```
npm test
``` 
or 
```
npm headless-test
```
5. Report will be generated in __results/report__

## Configuration
We can execute test with following variables [default values]:
- URL [http://localhost:3001/] - Portal UI url
- TYK_PRO_URL [http://localhost:3000/] - Tyk dashboard url
- TYK_DB_LICENSEKEY [] - Tyk dashboard license

Note: you can also use __.env__ file to provide the variables 


## Tooling:
1. Node.js
2. [Webdriverio](https://webdriver.io/)
3. [Timeline reporter](https://github.com/QualityOps/wdio-timeline-reporter) for reporting
