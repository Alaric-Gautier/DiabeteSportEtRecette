const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

//! Doute que data.confirmPassword fonctionne, à tester
//! Peut-être faire const {data, confirmPassword} = req.body; pour que ça fonctionne

const userService = {
    register: async (req, res) => {
        try {
            const data = req.body;
            // check if all fields are filled
            if (!data) {
                throw new Error("Please fill all fields");
            }
            // if email is already use, throw an error
            if (await prisma.account.findUnique({ where: { email: data.email } })) {
                throw new Error("Email already exists");
            }
            // check if email is valid
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!emailRegex.test(data.email)) {
                throw new Error("Email is not valid");
            }
            // check if password has at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(data.password)) {
                // TODO : add a message to explain why the password is not valid
                throw new Error("Password is not valid");
            }
            // check if passwords match
            if (data.password !== data.confirmPassword) {
                throw new Error("Passwords do not match");
            }
            // hash password
            const hashedPassword = await bcrypt.hash(data.password, 10);

            const user = await prisma.account.create({ data });
            res.status(201).json(user);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    getUserById: async (req, res) => {
        const user = await prisma.account.findUniqueOrThrow({
            where: {
                id: req.params.id,
            },
            include: {
                roles: true,
                sport_exercices: true,
                recipes: true,
                Reviews: true,
            },
        });
        res.json(user);
    },
};

module.exports = userService;
