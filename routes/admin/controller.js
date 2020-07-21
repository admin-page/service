const { User } = require("../../models");

module.exports = {
    getUsers: async (req, res) => {
        try {
            const result = await User.find();

            res.send({ message: "Get All datas users", data: result });
        } catch (error) {
            console.log(error);
        }
    },
    createUsers: async (req, res) => {
        try {
            const result = await User.create({ ...req.body });

            res.send({ message: "Registration Completed", data: result });
        } catch (error) {
            console.log(error);
        }
    },
};
