const AdminModel = require("../models/admin-details.model");
const bcrypt = require("bcrypt");
const { createTokens } = require("../JWT");

// 1. Add Admin

const AddAdmin = async (req, res) => {
    try {
        // Hash password before storing
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        let info = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            username: req.body.username,
            password: hashedPassword,
            role: req.body.role,
            profile_image: req.body.profile_image,
            status: req.body.status
        };

        const adminData = await AdminModel.create(info);

        // const adminTokenData = {
        //     id: adminData.id,
        //     email: adminData.email,
        //     role: "admin",
        // }

        // Generate tokens after creation
        // const { accessToken, refreshToken } = createTokens(adminTokenData, "admin");

        res.status(200).json({
            status: "SUCCESS",
            msg: "Admin details have been saved",
            data: adminData,
            // accessToken: accessToken,
            // refreshToken: refreshToken,
        });
        console.log(adminData);
    } catch (error) {
        console.error("Error posting admin:", error);

        if (error.name === "SequelizeUniqueConstraintError") {
            res.status(400).json({
                error: "Unique Constraint Violation",
                msg: "Record already exists",
            });
        } else if (error.name === "SequelizeValidationError") {
            const errorMessages = error.errors.map((err) => err.message);
            res.status(400).json({ error: "Validation Error", messages: errorMessages });
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};


// 2. Get All Admins

const GetAdmins = async (req, res) => {
    try {
        const admins = await AdminModel.findAll({
            attributes: { exclude: ["password"] }, // exclude password field in list
        });
        res.status(200).json({ records: admins, totalRecords: admins.length });
    } catch (error) {
        console.error("Error fetching admins:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// 3. Get Admin by ID

const GetAdminById = async (req, res) => {
    try {
        const admin = await AdminModel.findByPk(req.params.id, {
            attributes: { exclude: ["password"] },
        });
        if (admin) {
            res.status(200).json(admin);
        } else {
            res.status(404).json({ msg: "Admin not found" });
        }
    } catch (error) {
        console.error("Error fetching admin:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// 4. Update Admin

const UpdateAdmin = async (req, res) => {
    try {
        if (req.body.password) {
            // Hash new password if provided
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const updated = await AdminModel.update(req.body, {
            where: {
                admin_id: req.params.id,
            },
        });
        if (updated[0] === 0) {
            res.status(404).json({ msg: "Admin not found or no changes made" });
        } else {
            res.status(200).json({
                status: "SUCCESS",
                msg: "Admin details have been updated",
                data: req.body,
            });
            console.log(updated, "updated admin");
        }
    } catch (error) {
        console.error("Error updating admin:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// 5. Delete Admin

const DeleteAdmin = async (req, res) => {
    try {
        const deleted = await AdminModel.destroy({
            where: { admin_id: req.params.id },
        });
        if (deleted) {
            res.status(200).send("Admin data has been deleted!");
        } else {
            res.status(404).json({ msg: "Admin not found" });
        }
    } catch (error) {
        console.error("Error deleting admin:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    AddAdmin,
    GetAdmins,
    GetAdminById,
    UpdateAdmin,
    DeleteAdmin,
};
