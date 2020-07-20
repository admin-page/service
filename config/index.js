const { PORT, JWT_SECRET } = require("./environment");
const db = require("./database");

module.exports = {
    PORT,
    db,
    JWT_SECRET,
};
