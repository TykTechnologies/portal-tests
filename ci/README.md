# Tyk pro in docker
You can start the whole Tyk pro stack using files inside this folder.

## How to start Tyk pro
1. Provide the dashboard license in env var TYK_DB_LICENSEKEY
```
export TYK_DB_LICENSEKEY="LICENSE"
```
or just put it into __.env__ file.

2. Start docker-compose. Inside main repo folder execute:
```
docker-compose -f ci/tyk_dashboard.yml up
```

That's it! Right now you should have on your local:
- __Dashboard__ running on port 3000
- __GW__ on port 8080
- __redis__ on port 6379
- __mongo__ on port 27017

## Data dump for testing Portal
Mongo instance should be started with data dump that contains APIs and policies. Those can be imported in Portal as prducts and plans.
Credentails for creating Portal provider:
- __Dashboard URL__- http://localhost:3000/
- __Secret__ - 78b5d27bb6c14fe6729368977860097b
- __ORG id__ - 617006c1829b6f0001c6c039

To login to dasboard you can use already created user, email: portal@tyk.io, pass: test123.
