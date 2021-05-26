require('dotenv').config();

const URL = process.env.URL || "http://localhost:3001/";

module.exports = {
    URL: URL,
    LOGIN_PATH: "auth/login",
    DASHBOARD_API: URL + 'api/',
    DASHBOARD_ADMIN_API: URL + 'admin/',

    USER_EMAIL: process.env.USER_EMAIL || "auto_test@tyk.io",
    USER_PASSWORD: process.env.USER_PASSWORD || "test123",
};