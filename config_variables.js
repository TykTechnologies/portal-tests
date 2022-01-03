require('dotenv').config();

const URL = process.env.URL || "http://localhost:3001/";
const TYK_PRO_URL = process.env.TYK_PRO_URL || "http://localhost:3000/";
const TYK_GW_URL = process.env.TYK_GW_URL || "http://localhost:8080/";

module.exports = {
    URL: URL,
    TYK_GW_URL: TYK_GW_URL,
    TYK_PRO_URL: TYK_PRO_URL,
    LOGIN_PATH: "auth/login",
    DASHBOARD_API: TYK_PRO_URL + 'api/',
    DASHBOARD_ADMIN_API: TYK_PRO_URL + 'admin/',
    USERS_PATH: "users/",

    USER_EMAIL: process.env.USER_EMAIL || "auto_test@tyk.io",
    USER_PASSWORD: process.env.USER_PASSWORD || "test123",

    PROVIDER_NAME: "tyk provider",
    INVITE_ORG: "inviteTestOrg",
    ORG_A_NAME: "orgA",
    ORG_B_NAME: "orgB",
    INVITE_TEAM: "inviteTestTeam",
    TEAM_A_NAME: "teamA",
    TEAM_A1_NAME: "teamA1",
    TEAM_B_NAME: "teamB",
    DEV_EMAIL: "dev@tyk.io",
    DEV_A_EMAIL: "devA@tyk.io",
    DEV_A1_EMAIL: "devA1@tyk.io",
    TEAM_A1_INVITE_CODE: "26df5807666c48faad585b737c9a4806",
    DEV_B1_EMAIL: "devB1@tyk.io",
    DEV_PASS: "test123",
    TYK_SECRET: "eb18a1d86ae7492f55e6190ffde6ad55",
    TYK_ORG_ID: "617006c1829b6f0001c6c039",
    TYK_ADMIN_SECRET: "12345",

    //products and plans already created in Tyk db
    PRODUCT_COUNT: "7",
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

    PRODUCT_1_NAME: "product_1",
    API_1_NAME: "api_1",

    TAG_NAME: "portal_tag",
    PRODUCT_TAG_NAME: "product_with_tag",
    PLAN_TAG_NAME: "plan_with_tag",

    FREE_PLAN_NAME: "free_plan", //expiry: 1h, rate: 2/10s, quota: 3/1h 
    BRONZE_PLAN_NAME: "bronze_plan", //expiry: 6h, rate: 50/60s, quota: 111/1month
    SILVER_PLAN_NAME: "silver_plan", //expiry: 12h, rate: 1000/135s, quota: 5000/1week
    GOLD_PLAN_NAME: "gold_plan", //expiry: never, rate: 1001/1s, quota: unlimited
    PLATINUM_PLAN_NAME: "platinum_plan", //expiry: never, rate: unlimited, quota: unlimited

    //2nd org
    ORG_2_TYK_SECRET: "134257b2eb8c46ac554c9e820f71e38b",
    ORG_2_TYK_ORG_ID: "61a8ba54e35eb50001fe4449",
};
