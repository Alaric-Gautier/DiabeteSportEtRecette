const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const moment = require("moment");
const { validateEmail, validatePassword, isEmpty } = require("../utils/tools");

const userService = {
    register: async (req, res) => {
        try {
            const { firstName, lastName, email, birthDate, is_diabetic, diabetes_type, password, confirmPassword } = req.body;
            // check if all required fields are filled with isEmpty function
            isEmpty(firstName, lastName, email, birthDate, is_diabetic, password, confirmPassword);

            // if email is already use, throw an error
            if (await prisma.account.findUnique({ where: { email: email } })) {
                throw new Error("Email already exists");
            }

            // check if email is valid
            validateEmail(email);

            // check if password has at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character
            validatePassword(password);

            // check if passwords match
            if (password !== confirmPassword) {
                throw new Error("Passwords do not match");
            }

            // hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // check if birthDate format is valid
            if (!moment(birthDate, "DD/MM/YYYY", true).isValid()) {
                throw new Error("Birth date format is not valid, please use DD/MM/YYYY");
            }

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
                    // roles: {
                    //     connect: {
                    //         id: 1,
                    //     }
                    // }
                },
            });
            res.status(201).json(user);
        } catch (err) {
            res.status(400).json({ message: err.message, error: err.errorCodes });
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
