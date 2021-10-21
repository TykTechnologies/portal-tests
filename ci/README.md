# Tyk pro in docker
You can start the whole Tyk pro stack using files inside this folder.

## How to start Tyk pro
1. Provide the dashboard license in env var TYK_DB_LICENSEKEY
```
export TYK_DB_LICENSEKEY="LICENSE"
```
or just put it into __.env__ file.

2. Start docker-compose. Inside this folder execute:
```
docker-compose -f tyk_dashboard.yml up
```

That's it! Right now you should have on your local:
- __Dashboard__ running on port 3000
- __GW__ on port 8080
- __redis__ on port 6379
- __mongo__ on port 27017

## Data dump for testing Raava
Mongo instance should be started with data dump that contains APIs and policies. Those will be imported in Raava as prducts and plans.

To login to dasboard you can use already created user, email: raava@tyk.io, pass: test123.

__Important__: before synchronyzing Raava with Dashboard you need to reset the API secret of choosen user.