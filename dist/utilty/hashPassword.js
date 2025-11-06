"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.generateSalt = generateSalt;
const crypto_1 = __importDefault(require("crypto"));
function hashPassword(password, salt) {
    return new Promise((resolve, reject) => {
        crypto_1.default.scrypt(password.normalize(), salt, 64, (err, hash) => {
            if (err)
                reject(err);
            resolve(hash.toString("hex").normalize());
        });
    });
}
function generateSalt() {
    return crypto_1.default.randomBytes(154).toString("hex").normalize();
}
