"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_root_path_1 = __importDefault(require("app-root-path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `${app_root_path_1.default}/.env` });
exports.default = {
    NODE_ENV: process.env.NODE_ENV,
    APP_ROOT: app_root_path_1.default.path,
    PORT: process.env.PORT,
    API_ROOT: `${process.env.API_ROOT}/v${process.env.VERSION}`,
    DATABASE_URL: process.env.DATABASE_URL,
};
//# sourceMappingURL=env.js.map