require('dotenv').config();

const DOCKER_EXECUTION = process.env.DOCKER_EXECUTION || false;
let URL, HOST_IP, TYK_GW_URL, TYK_PRO_URL, KEYCLOAK_WELL_KNOWN_URL, KEYCLOAK_URL_TOKEN_ENDPOINT; 
if (DOCKER_EXECUTION) {
    HOST_IP = process.env.HOST_IP || "host.docker.internal";
    URL = `http://${HOST_IP}:3001/`;
    TYK_GW_URL = "http://tyk-gateway:8081/";
    KEYCLOAK_URL_TOKEN_ENDPOINT = "http://keycloak:8080/auth/realms/master/protocol/openid-connect/token";
    KEYCLOAK_WELL_KNOWN_URL = "http://localhost:8080/auth/realms/master/.well-known/openid-configuration";
    TYK_PRO_URL = "http://tyk-dashboard:3000";

} else {
    URL = process.env.URL || "http://localhost:3001/";
    TYK_GW_URL = "http://localhost:8081/";
    KEYCLOAK_WELL_KNOWN_URL = "http://localhost:8080/auth/realms/master/.well-known/openid-configuration";
    TYK_PRO_URL = "http://localhost:3000/";
    KEYCLOAK_URL_TOKEN_ENDPOINT = "http://localhost:8080/auth/realms/master/protocol/openid-connect/token";
}
if (process.env.ARA_TYK) {
    TYK_GW_URL = "https://breezy-barracks-gw.aws-euw1.cloud-ara.tyk.io";
    TYK_PRO_URL = "https://secondary-pantsuit-adm.aws-euw1.cloud-ara.tyk.io";
}

module.exports = {
    URL: URL,
    TYK_GW_URL: TYK_GW_URL || "http://localhost:8081/",
    TYK_PRO_URL: TYK_PRO_URL,
    LOGIN_PATH: "auth/password/login",
    DASHBOARD_API: TYK_PRO_URL + 'api/',
    DASHBOARD_ADMIN_API: TYK_PRO_URL + 'admin/',
    USERS_PATH: "users/",

    EMAIL_SERVER_PORT: 6061, 
    EMAIL_SERVER_API_URL: "http://localhost:8025", 

    USER_EMAIL: process.env.USER_EMAIL || "auto_test@tyk.io",
    USER_PASSWORD: process.env.USER_PASSWORD || "test123",

    PROVIDER_NAME: "tyk provider",
    INVITE_ORG: "inviteTestOrg",
    ORG_A_NAME: "orgA",
    ORG_B_NAME: "orgB",
    ORG_D_NAME: "orgD",
    INVITE_TEAM: "inviteTestTeam",
    TEAM_A_NAME: "teamA",
    TEAM_A1_NAME: "teamA1",
    TEAM_B_NAME: "teamB",
    TEAM_D_NAME: "teamD",
    DEV_EMAIL: "dev@tyk.io",
    DEV_A_EMAIL: "devA@tyk.io",
    DEV_A1_EMAIL: "devA1@tyk.io",
    TEAM_A1_INVITE_CODE: "26df5807666c48faad585b737c9a4806",
    DEV_B_EMAIL: "devB@tyk.io",
    DEV_D_EMAIL: "devD@tyk.io",
    DEV_PASS: "test123",
    // TYK_SECRET: "eb18a1d86ae7492f55e6190ffde6ad55",
    TYK_SECRET: "c923b8b8b971495470b8e7d14a2d47fc",
    TYK_ORG_ID: "617006c1829b6f0001c6c039",
    TYK_ADMIN_SECRET: "12345",

    //products and plans already created in Tyk db
    PRODUCT_COUNT: "9",
    PLAN_COUNT: "6",
    
    PUBLIC_CATALOGUE_NAME: "Public Ctalogue",
    PRODUCT_PUBLIC_NAME: "public_product",
    PUBLIC_API_NAME: "public_api",

    PRIVATE_CATALOGUE_NAME: "Private Ctalogue",
    PRODUCT_PRIVATE_NAME: "private_product",
    PRIVATE_API_1_NAME: "private_api_1",
    PRIVATE_API_2_NAME: "private_api_2",

    CUSTOM_CATALOGUE_ORG_A_NAME: "Org A Catalogue",
    PRODUCT_ORG_A_NAME: "product_org_a",
    CUSTOM_API_ORG_A_NAME: "custom_api_org_a",
    //plan: SILVER_PLAN_NAME

    CUSTOM_CATALOGUE_TEAM_A_NAME: "Team A Catalogue",
    PRODUCT_TEAM_A_NAME: "product_team_a",
    CUSTOM_API_TEAM_A_NAME: "custom_api_team_a",
    CUSTOM_API_TEAM_A_NAME_BIS: "custom_api_team_a_bis",
    //plan: GOLD_PLAN_NAME

    CUSTOM_CATALOGUE_TEAM_B_NAME: "Team B Catalogue",
    PRODUCT_TEAM_B_NAME: "product_team_b",
    CUSTOM_API_TEAM_B_NAME: "custom_api_team_b",

    CUSTOM_CATALOGUE_TEAM_D_NAME: "DCR_1",
    PRODUCT_TEAM_D_NAME: "keycloak_product_X",
    CUSTOM_API_TEAM_D_NAME: "keycloak_x",

    PRODUCT_1_NAME: "product_1",
    API_1_NAME: "api_1",

    TAG_NAME: "portal_tag",
    PRODUCT_TAG_NAME: "product_with_tag",
    PLAN_TAG_NAME: "plan_with_tag",

    FREE_PLAN_NAME: "free_plan", //expiry: 1h, rate: 5/85s, quota: 3/1h
    FREE_PLAN_RATE_LIMIT: 5, 
    BRONZE_PLAN_NAME: "bronze_plan", //expiry: 6h, rate: 50/60s, quota: 111/1month
    SILVER_PLAN_NAME: "silver_plan", //expiry: 12h, rate: 1000/135s, quota: 5000/1week
    GOLD_PLAN_NAME: "gold_plan", //expiry: never, rate: 1001/1s, quota: unlimited
    PLATINUM_PLAN_NAME: "platinum_plan", //expiry: never, rate: unlimited, quota: unlimited

    //2nd org
    ORG_2_TYK_SECRET: "134257b2eb8c46ac554c9e820f71e38b",
    ORG_2_TYK_ORG_ID: "61a8ba54e35eb50001fe4449",

    //email settings
    EMAIL_FROM_ADDRESS:"portal_admin@tyk.io",
    EMAIL_DEFAULT_FROM_ADDRESS:"portal@tyk.io",
    RESET_EMAIL_SUBJECT:"Reset password",
    APPROVE_EMAIL_SUBJECT:"Provisioning request was approved",
    REJECT_EMAIL_SUBJECT:"Provisioning request was rejected",
    REGISTER_EMAIL_SUBJECT:"Register to portal",
    INVITE_EMAIL_SUBJECT:"Invitation to portal",
    SMTP_HOST:"localhost",
    SMTP_PORT:"1025",
    SMTP_USER:"abc",
    SMTP_PASS:"xyz",

    KEYCLOAK_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI4ODhmNjUzNC03OWRiLTQ2NWQtOWIwMi05MmJhODEzYjE2YTEifQ.eyJleHAiOjE3MzQ2MDkxMDksImlhdCI6MTY0ODIwOTEwOSwianRpIjoiNmEwYTUwMzAtMDc2Zi00NWFlLWI4ODQtNjc0MTIxODQ0MTA1IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL21hc3RlciIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9hdXRoL3JlYWxtcy9tYXN0ZXIiLCJ0eXAiOiJJbml0aWFsQWNjZXNzVG9rZW4ifQ.azORNclzO5yMq-HdHtL5LYhFqc8mSNijs21C_r9IrKc",
    KEYCLOAK_WELL_KNOWN_URL: KEYCLOAK_WELL_KNOWN_URL,
    KEYCLOAK_URL_TOKEN_ENDPOINT: KEYCLOAK_URL_TOKEN_ENDPOINT,
    CLIENT1_TYPE_NAME: "keycloak_type1"
};
