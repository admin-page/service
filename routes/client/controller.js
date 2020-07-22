const { User } = require("../../models");
const { hash, compare } = require("../../helpers");
const { createToken } = require("../../helpers");

module.exports = {
    getUser: async (req, res) => {
        try {
            const result = await User.find();

            res.send({ message: "Get All datas users", data: result });
        } catch (error) {
            console.log(error);
        }
    },

    getUserName: async (req, res) => {
        const { search } = req.params;

        try {
            const result = await User.find({
                $or: [
                    { fullname: { $regex: search, $options: "i" } },
                    { address: { $regex: search, $options: "i" } },
                ],
            }).exec();
            if (result) {
                res.send({ result: result });
            }
            res.send(`${search} Not Found`);
        } catch (error) {
            res.send(error);
        }
    },

    createUser: async (req, res) => {
        const { email, password } = req.body;
        const hashed = await hash(password);

        try {
            const checkEmail = await User.findOne({
                email,
            }).exec();
            if (checkEmail) {
                res.send(`Email ${email} has been registered`);
            }

            const result = await User.create({
                ...req.body,
                password: hashed,
            });

            res.send({ message: "Registration Completed", data: result });
        } catch (error) {
            console.log(error);
        }
    },

    updateUser: async (req, res) => {
        const { id } = req.params;
        try {
            const { password } = req.body;
            const hashed = await hash(password);
            const results = await User.findByIdAndUpdate(id, {
                $set: {
                    ...req.body,
                    password: hashed,
                },
            });

            res.send({
                message: `Update data succcess`,
                data: results,
            });
        } catch (error) {
            res.send(error);
        }
    },

    deleteUser: async (req, res) => {
        const { id } = req.params;

        try {
            const results = await User.deleteOne({
                _id: id,
            });
            res.send({
                message: `Delete data succcess`,
                results: results,
            });
        } catch (error) {
            res.send(error);
        }
    },

    login: async (req, res) => {
        try {
            const { password, email, username } = req.body;

            const registeredUser = await User.findOne({
                $or: [{ email }, { username }],
            });

            if (registeredUser !== null) {
                const compared = await compare(
                    password,
                    registeredUser.password
                );
                if (compared === true) {
                    const token = await createToken({
                        id: registeredUser._id,
                        fullname: registeredUser.fullname,
                        email: registeredUser.email,
                    });

                    res.send({
                        message: "Login Successfully",
                        result: token,
                    });
                } else {
                    res.status(403).send({
                        message: "Your Email or Password is Incorrect",
                    });
                }
            } else {
                res.status(403).send({
                    message: "Your Email is not registered",
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
};
