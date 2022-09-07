# Portal-test
UI automated tests for Portal

test coverage can be found [here](coverage.md)

## Running tests in docker
To dockerize the framework we are using Selenium hub. This will install dependecies, run the driver and browser inside containers (no need for nodejs, npm or chrome to be installed locally).
1. Clone this repository
2. Generate and export license (for Portal and dashboard) to env variables
```
export PORTAL_LICENSEKEY=%license%
export TYK_DB_LICENSEKEY=%license%
```
3. Start dependencies. This will start Tyk stack and Selenium hub
```
make start-dependecies
```
4. Build test framework image (this need to be done only once)
```
make build-framework
```
5. Execute prerequisits (run only once, on clear Portal)
```
make execute-prerequisits
```
6. Execute tests
```
make execute-tests
```
You can now edit the framework code (on your local) and just re-run *execute-tests*, no need of rebuilding the image. Results should be created in */result* folder.
To kill dockers with dependencies just run:
```
make stop-dependecies
```

## Prerequisits for manual testing
If you just need a working instance of Portal connected with Tyk and Keycloak - start docker-compose (point 2 below) and make your Portal to use database saved in ci/portal.db file.
Portal should now be connected to Tyk Dahsboard and be have DCR details set up.
## How to run tests locally (not using Selenium hub)
Tests can be executed inside docker wdio service.
1. Clone this repository
2. Install framework dependencies
```
npm install
```
3. Generate and export license (for Portal and dashboard) to env variables
```
export PORTAL_LICENSEKEY=%license%
export TYK_DB_LICENSEKEY=%license%
```
4. Start docker-compose with Tyk stack (gateway, dashboard, redis, mongo) using single command
```
docker-compose -f ci/tyk_dashboard.yml up
```
5. Start your Portal instance with empty database and admin user
```
./dev-portal  --bootstrap -user=auto_test@tyk.io -pass=test123
``` 
6. Execute prerequisits
```
npm run docker-prerequisits
```
After this you will have Portal filled with data needed for manual testing (provider, users, catalogues, etc.). 
7.  Execute tests
```
npm run docker-test
```
8. Report will be generated in __results/report/index.html__

Tests will also work with Portal started as docker container. Just please make sure that admin user was created.
If portal

## Notes
- Tests also works with Portal started as docker container (please make sure that URL is provided and admin user was created)
- Tests are executed on chrome browser
- Tests are triggered as github action inside Portal repository 

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
