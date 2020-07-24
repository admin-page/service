const { createToken, verifyToken } = require("../../helpers");
const { House } = require("../../models");

module.exports = {
    getHouse: async (req, res) => {
        try {
            const result = await House.find();
            res.send({ message: "get all data", data: result });
        } catch (error) {
            res.send(error);
        }
    },
    uploadHouse: async (req, res) => {
        try {
            if (req.token.isAdmin) {
                const result = await House.create({
                    ...req.body,
                });
                res.send({ message: "data succesfuly upload", data: result });
            } else {
                res.status(403).send({ message: "forbidden" });
            }
        } catch (error) {
            res.send(error);
        }
    },
    updateHouse: async (req, res) => {
        const { id } = req.params;

        try {
            if (req.token.isAdmin) {
                const result = await House.findByIdAndUpdate(id, {
                    ...req.body,
                });
                res.send({ message: "data upload succesfuly", data: result });
            } else {
                res.status(403).send({ message: "forbidden" });
            }
        } catch (error) {
            res.send(error);
        }
    },
    deleteHouse: async (req, res) => {
        const { id } = req.params;
        try {
            if (req.token.isAdmin) {
                const result = await House.findByIdAndDelete(id);
                res.send({ message: "data deleted", data: result });
            } else {
                res.status(403).send({ message: "forbidden" });
            }
        } catch (error) {
            res.send(error);
        }
    },
    filterHouse: async (req, res) => {
        const title = req.body.houseTitle;
        try {
            const result = await House.find({ houseTitle: title }).exec();
            res.send({ message: "get by title", data: result });
        } catch (error) {
            res.send(error);
        }
    },
    findHouseById: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await House.findById(id);
            res.send({ message: "display house by id", data: result });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    },
};
