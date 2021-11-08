require('dotenv').config();

const URL = process.env.URL || "http://localhost:3001/";
const TYK_PRO_URL = process.env.TYK_PRO_URL || "http://localhost:3000/";

module.exports = {
    URL: URL,
    TYK_PRO_URL: TYK_PRO_URL,
    LOGIN_PATH: "auth/login",
    DASHBOARD_API: TYK_PRO_URL + 'api/',
    DASHBOARD_ADMIN_API: TYK_PRO_URL + 'admin/',
    USERS_PATH: "users/",

    USER_EMAIL: process.env.USER_EMAIL || "auto_test@tyk.io",
    USER_PASSWORD: process.env.USER_PASSWORD || "test123",

    TYK_SECRET: "78b5d27bb6c14fe6729368977860097b",
    TYK_ORG_ID: "617006c1829b6f0001c6c039",
    TYK_ADMIN_SECRET: "12345"
};