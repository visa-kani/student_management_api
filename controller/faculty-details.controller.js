const FacultyModel = require("../models/faculty-details.model");
const bcrypt = require("bcrypt");
// 1. Add Faculty

const AddFaculty = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let info = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            date_of_birth: req.body.date_of_birth,
            gender: req.body.gender,
            email: req.body.email,
            phone_number: req.body.phone_number,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            pincode: req.body.pincode,
            country: req.body.country,
            designation: req.body.designation,
            department: req.body.department,
            joining_date: req.body.joining_date,
            qualification: req.body.qualification,
            experience: req.body.experience,
            profile_image: req.body.profile_image,
            status: req.body.status,
            password: hashedPassword,
        };

        console.log(info, "addFacultyData");
        const facultyData = await FacultyModel.create(info);

        res.status(200).json({
            status: "SUCCESS",
            msg: "Faculty details have been saved",
            data: facultyData,
        });
        console.log(facultyData);
    } catch (error) {
        console.error("Error posting faculty:", error);

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

// 2. Get All Faculty

const GetFaculties = async (req, res) => {
    try {
        const faculties = await FacultyModel.findAll();
        res.status(200).json({ records: faculties, totalRecords: faculties.length });
    } catch (error) {
        console.error("Error fetching faculties:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// 3. Get Faculty by ID

const GetFacultyById = async (req, res) => {
    try {
        const faculty = await FacultyModel.findByPk(req.params.id);
        if (faculty) {
            res.status(200).json(faculty);
        } else {
            res.status(404).json({ msg: "Faculty not found" });
        }
    } catch (error) {
        console.error("Error fetching faculty:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// 4. Update Faculty

const UpdateFaculty = async (req, res) => {
    try {
        const updated = await FacultyModel.update(req.body, {
            where: {
                faculty_id: req.params.id,
            },
        });
        if (updated[0] === 0) {
            res.status(404).json({ msg: "Faculty not found or no changes made" });
        } else {
            res.status(200).json({
                status: "SUCCESS",
                msg: "Faculty details have been updated",
                data: req.body,
            });
            console.log(updated, "updated faculty");
        }
    } catch (error) {
        console.error("Error updating faculty:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// 5. Delete Faculty

const DeleteFaculty = async (req, res) => {
    try {
        const deleted = await FacultyModel.destroy({
            where: { faculty_id: req.params.id },
        });
        if (deleted) {
            res.status(200).send("Faculty data has been deleted!");
        } else {
            res.status(404).json({ msg: "Faculty not found" });
        }
    } catch (error) {
        console.error("Error deleting faculty:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    AddFaculty,
    GetFaculties,
    GetFacultyById,
    UpdateFaculty,
    DeleteFaculty,
};
