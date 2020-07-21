const { Admin } = require("../../models");
const { hash, compare } = require("../../helpers");
const { createToken } = require("../../helpers");

module.exports = {
    getAdmin: async (req, res) => {
        try {
            const result = await Admin.find();

            res.send({ message: "Get All datas users", data: result });
        } catch (error) {
            console.log(error);
        }
    },

    getAdminName: async (req, res) => {
        const { username } = req.params;

        try {
            const result = await Admin.find({
                username: { $regex: username, $options: "i" },
            });

            res.send({ result: result });
        } catch (error) {
            res.send(error);
        }
    },

    createAdmin: async (req, res) => {
        const { email, password } = req.body;
        const hashed = await hash(password);

        try {
            const checkEmail = await Admin.findOne({
                email,
            }).exec();
            if (checkEmail) {
                res.send(`Email ${email} has been registered`);
            }

            const result = await Admin.create({
                ...req.body,
                password: hashed,
            });

            res.send({ message: "Registration Completed", data: result });
        } catch (error) {
            console.log(error);
        }
    },

    updateAdmin: async (req, res) => {
        const { id } = req.params;
        try {
            const { password } = req.body;
            const hashed = await hash(password);
            const results = await Admin.findByIdAndUpdate(id, {
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

    deleteAdmin: async (req, res) => {
        const { id } = req.params;

        try {
            const results = await Admin.deleteOne({
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

            const registeredUser = await Admin.findOne({
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
