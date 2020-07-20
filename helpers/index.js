const { hash } = require("./bcrypt");
const { hash, compare } = require("./bcrypt");
const { createToken, verifyToken } = require("./jwt");

module.exports = {
    hash,
    compare,
    createToken,
    verifyToken,
};
