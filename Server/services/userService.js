const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const moment = require("moment");

const userService = {
    register: async (req, res) => {
        try {
            const { firstName, lastName, email, birthDate, is_diabetic, diabetes_type, password, confirmPassword } =
                req.body;
            // check if all required fields are filled
            if (!firstName || !lastName || !email || !birthDate || !is_diabetic || !password || !confirmPassword) {
                throw new Error("All required fields are not filled");
            }
            // if email is already use, throw an error
            if (await prisma.account.findUnique({ where: { email: email } })) {
                throw new Error("Email already exists");
            }
            // check if email is valid
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!emailRegex.test(email)) {
                throw new Error("Email format is not valid");
            }
            // check if password has at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character
            // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            // if (!passwordRegex.test(password)) {
            // TODO : add a message to explain why the password is not valid
            //     throw new Error("Password is not valid");
            // }
            // check if passwords match
            if (password !== confirmPassword) {
                throw new Error("Passwords do not match");
            }
            // check if birthDate format is valid
            if (!moment(birthDate, "DD/MM/YYYY", true).isValid()) {
                throw new Error("Birth date format is not valid, please use DD/MM/YYYY");
            }
            // hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            // create user
            const user = await prisma.account.create({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    birthDate: birthDate,
                    is_diabetic: is_diabetic,
                    diabetes_type: diabetes_type,
                    password: hashedPassword,
                },
            });
            res.status(201).json(user);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    getUserById: async (req, res) => {
        const user = await prisma.account.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
            include: {
                roles: true,
                sport_exercises: true,
                recipes: true,
                reviews: true,
            },
        });
        res.json(user);
    },
};

module.exports = userService;
