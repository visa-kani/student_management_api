const StudentModel = require("../models/student-details.model");
const ExcelJS = require('exceljs');
const { Op } = require("sequelize");
const xlsx = require("xlsx");
const { AddActivityLog } = require("./activity-logs.controller");

// 1. Add Student

const AddStudent = async (req, res) => {
  try {
    let profileImagePath = req.file ? req.file.path : null;
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
      enrollment_number: req.body.enrollment_number,
      admission_date: req.body.admission_date,
      profile_image: profileImagePath,
      course: req.body.course,
      status: req.body.status,
    };

    console.log(info, "addStudentData");
    console.log(req, "req-student");

    const studentData = await StudentModel.create(info);
    const userData = {
      id: req.user.id,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      role: req.user.role
    };
    AddActivityLog("create", userData, studentData, null);
    res.status(200).json({
      status: "SUCCESS",
      msg: "Student details have been saved",
      data: studentData,
    });
    console.log(studentData);
  } catch (error) {
    console.error("Error posting student:", error);

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

// 2. Get All Students

const GetStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", course = "" } = req.query;
    const offset = (page - 1) * limit;

    // Build WHERE condition
    let whereCondition = {
      [Op.and]: [],
    };

    // Add search condition for first_name or last_name
    if (search) {
      whereCondition[Op.and].push({
        [Op.or]: [
          { first_name: { [Op.like]: `%${search}%` } },
          { last_name: { [Op.like]: `%${search}%` } },
        ],
      });
    }

    // Add course filter if provided
    if (course) {
      whereCondition[Op.and].push({
        course: { [Op.like]: `%${course}%` },
      });
    }

    // If no conditions, set to empty object to fetch all
    if (whereCondition[Op.and].length === 0) {
      whereCondition = {};
    }

    const { rows: students, count: totalRecords } = await StudentModel.findAndCountAll({
      where: whereCondition,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["id", "DESC"]],
    });

    res.status(200).json({
      records: students,
      totalRecords,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalRecords / limit),
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 3. Get Student by ID

const GetStudentById = async (req, res) => {
  try {
    const student = await StudentModel.findByPk(req.params.id);
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ msg: "Student not found" });
    }
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 4. Update Student

const UpdateStudent = async (req, res) => {
  try {
    const previousData = await StudentModel.findByPk(req.params.id);
    let profileImagePath = req.file ? req.file.path : previousData.profile_image;

    req.body.profile_image = profileImagePath;

    const updated = await StudentModel.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (updated[0] === 0) {
      res.status(404).json({ msg: "Student not found or no changes made" });
    } else {
      const userData = {
        id: req.user.id,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        role: req.user.role
      };
      AddActivityLog("update", userData, req.body, previousData);
      res.status(200).json({
        status: "SUCCESS",
        msg: "Student details have been updated",
        data: req.body,
      });
      console.log(updated, "updated student");
    }
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 5. Delete Student

const DeleteStudent = async (req, res) => {
  const previousData = await StudentModel.findByPk(req.params.id);
  try {
    const deleted = await StudentModel.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      const userData = {
        id: req.user.id,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        role: req.user.role
      };
      AddActivityLog("delete", userData, previousData, null);
      res.status(200).json({
        status: "SUCCESS",
        msg: "Student details have been deleted",
      });
    } else {
      res.status(404).json({ msg: "Student not found" });
    }
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const UploadStudentsFromExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const data = xlsx.utils.sheet_to_json(sheet);

    let savedStudents = [];
    let failedStudents = [];

    for (const student of data) {
      // Validate required fields
      if (!student.email || !student.enrollment_number) {
        failedStudents.push({
          student,
          error: "Missing required unique fields: email or enrollment_number",
        });
        continue;
      }

      // Check if email or enrollment_number exists
      const existing = await StudentModel.findOne({
        where: {
          [Op.or]: [
            { email: student.email },
            { enrollment_number: student.enrollment_number },
          ],
        },
      });

      if (existing) {
        failedStudents.push({
          student,
          error: "Duplicate email or enrollment_number",
        });
        continue;
      }

      try {
        const newStudent = await StudentModel.create({
          first_name: student.first_name || "",
          last_name: student.last_name || "",
          date_of_birth: student.date_of_birth || null,
          gender: student.gender || "",
          email: student.email,
          phone_number: student.phone_number || "",
          address: student.address || "",
          city: student.city || "",
          state: student.state || "",
          pincode: student.pincode || "",
          country: student.country || "",
          enrollment_number: student.enrollment_number,
          admission_date: student.admission_date || null,
          profile_image: student.profile_image || "",
          course: student.course || "",
          status: student.status || "Active",
        });

        savedStudents.push(newStudent);
      } catch (err) {
        console.error("Error saving student:", err);
        failedStudents.push({ student, error: err.message });
      }
    }

    res.status(200).json({
      status: "SUCCESS",
      msg: "Excel upload processed",
      saved: savedStudents.length,
      failed: failedStudents.length,
      failedRecords: failedStudents,
    });

  } catch (error) {
    console.error("Error uploading students from Excel:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const DownloadStudentsExcel = async (req, res) => {
  try {
    const students = await StudentModel.findAll();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Students');

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'First Name', key: 'first_name', width: 20 },
      { header: 'Last Name', key: 'last_name', width: 20 },
      { header: 'Date of Birth', key: 'date_of_birth', width: 15 },
      { header: 'Gender', key: 'gender', width: 10 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Phone Number', key: 'phone_number', width: 15 },
      { header: 'Address', key: 'address', width: 30 },
      { header: 'City', key: 'city', width: 15 },
      { header: 'State', key: 'state', width: 15 },
      { header: 'Pincode', key: 'pincode', width: 10 },
      { header: 'Country', key: 'country', width: 15 },
      { header: 'Enrollment Number', key: 'enrollment_number', width: 20 },
      { header: 'Admission Date', key: 'admission_date', width: 15 },
      { header: 'Course', key: 'course', width: 20 },
      { header: 'Status', key: 'status', width: 10 },
    ];

    students.forEach(student => {
      worksheet.addRow(student.toJSON());
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=students.xlsx');

    // Pipe workbook to response stream
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error generating Excel:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const GetStudentCourseCount = async (req, res) => {
  try {

     const totalStudents = await StudentModel.count();
    // Fetch course-wise count
    const courseCounts = await StudentModel.findAll({
      attributes: [
        'course',
        [StudentModel.sequelize.fn('COUNT', StudentModel.sequelize.col('course')), 'count']
      ],
      group: ['course']
    });

    // Fetch gender-wise count
    const genderCounts = await StudentModel.findAll({
      attributes: [
        'gender',
        [StudentModel.sequelize.fn('COUNT', StudentModel.sequelize.col('gender')), 'count']
      ],
      group: ['gender']
    });

    res.status(200).json({
      status: "SUCCESS",
      data: {
        totalStudents,
        courseCounts,
        genderCounts
      }
    });
  } catch (error) {
    console.error("Error fetching course/gender count:", error);
    res.status(500).json({ status: "ERROR", msg: "Internal Server Error" });
  }
};

module.exports = {
  AddStudent,
  GetStudents,
  GetStudentById,
  UpdateStudent,
  DeleteStudent,
  UploadStudentsFromExcel,
  DownloadStudentsExcel,
  GetStudentCourseCount
};
