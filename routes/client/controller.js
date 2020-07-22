const { User } = require("../../models");
const { hash, compare } = require("../../helpers");
const { createToken } = require("../../helpers");

const fs = require("fs");

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
            });
            if (result) {
                res.send({ result: result });
            } else {
                res.send(`${search} Not Found`);
            }
        } catch (error) {
            res.send(error);
        }
    },

    getUserId: async (req, res) => {
        const { id } = req.params;

        try {
            const result = await User.findById(id);
            console.log(result);
            if (result) {
                res.send({ result: result });
            } else {
                res.send(`${search} Not Found`);
            }
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
            } else {
                const img =
                    req.file != undefined
                        ? fs.readFileSync(req.file.path)
                        : fs.readFileSync("images/avatar_default.png");

                const encode_image = img.toString("base64");
                const avatar = {
                    contentType:
                        req.file != undefined ? req.file.mimetype : "image/png",
                    data: new Buffer(encode_image, "base64"),
                };
                const result = await User.create({
                    ...req.body,
                    password: hashed,
                    avatar,
                });

                res.send({ message: "Registration Completed", data: result });
            }
        } catch (error) {
            console.log(error);
        }
    },

    updateUser: async (req, res) => {
        const { id } = req.params;
        try {
            const { password } = req.body;
            const hashed = await hash(password);
            const img =
                req.file != undefined
                    ? fs.readFileSync(req.file.path)
                    : fs.readFileSync("images/avatar_default.png");

            const encode_image = img.toString("base64");
            const avatar = {
                contentType:
                    req.file != undefined ? req.file.mimetype : "image/png",
                data: new Buffer(encode_image, "base64"),
            };

            const results = await User.findByIdAndUpdate(id, {
                $set: {
                    ...req.body,
                    avatar,
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

    logout: (req, res) => {
        req.logout();
        res.redirect("/users/login");
    },
};
