require('dotenv').config();

const URL = process.env.URL || "http://localhost:3001/";

module.exports = {
    URL: URL,
    GW_URL: process.env.GW_URL || "http://localhost:8085/",
    LOGIN_PATH: "auth/login",
    DASHBOARD_API: URL + 'api/',
    DASHBOARD_ADMIN_API: URL + 'admin/',

    USER_EMAIL: process.env.USER_EMAIL || "auto_test@tyk.io",
    USER_PASSWORD: process.env.USER_PASSWORD || "test123",

    TYK_SECRET: "2bc29a1f2bed4a5f5554f0b457789ed0",
    TYK_ORG_ID: "61010bc82ad0a20001fc35b5",
    TYK_GW_SECRET: "352d20ee67be67f6340b4c0605b044b7"
};