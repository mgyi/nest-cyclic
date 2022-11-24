"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAxiosInstance = void 0;
const axios = require('axios');
const getAxiosInstance = (baseURL, apiKey) => {
    return axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
            'X-MBX-APIKEY': apiKey
        }
    });
};
exports.getAxiosInstance = getAxiosInstance;
//# sourceMappingURL=api.js.map