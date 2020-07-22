const {
    PORT,
    MONGODB_URI_LOCAL,
    MONGODB_URI_LIVE,
    JWT_SECRET,
} = require("./environment");
const db = require("./database");

module.exports = {
    db,
    PORT,
    MONGODB_URI_LOCAL,
    MONGODB_URI_LIVE,
    JWT_SECRET,
};
