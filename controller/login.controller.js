const FacultyModel = require("../models/faculty-details.model");
const AdminModel = require("../models/admin-details.model");
const bcrypt = require("bcrypt");
const { createTokens } = require("../JWT");

const Login = async (req, res) => {
    const { email, password, role } = req.body;
    console.log(email, password, role, "login Data");
    try {
        let loginData;
        if (role === "admin") {
            loginData = await AdminModel.findOne({ where: { email: email } });
        } else {
            loginData = await FacultyModel.findOne({ where: { email: email } });
        }

        if (!loginData) return res.status(400).json({ error: `${role} doesn't exist` });

        const dbPassword = loginData.password;

        const match = await bcrypt.compare(password, dbPassword);
        if (!match) {
            return res.status(400).json({ error: "Wrong email or password combination!" });
        } else {
            const { accessToken, refreshToken } = createTokens(loginData, role);

            loginData.role = role;

            res.json({
                status: "SUCCESS",
                msg: `${role} logged in successfully!`,
                userDetails: loginData,
                accessToken: accessToken,
                refreshToken: refreshToken
            });
        }
    } catch (error) {
        console.error("Error logging in :", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { Login };
