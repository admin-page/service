const mongoose = require("mongoose");

const { MONGODB_URI_LOCAL, MONGODB_URI_ATLAS } = require("./environment");

mongoose
    .connect(MONGODB_URI_LOCAL || MONGODB_URI_ATLAS, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log("Success connect to database");
    })
    .catch((error) => {
        console.log(error);
    });

const db = mongoose.connection;

module.exports = db;
