const express = require("express");
const app = express();

const { db, PORT } = require("./config");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("Welcome to Rest API");
});

app.use("/admin", require("./routes/admin"));

if (db) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
