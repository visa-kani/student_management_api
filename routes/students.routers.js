const studentData = require("../controller/student-details.controller")
const router = require('express').Router()
const upload = require("../utils/upload-files");
const profileImage = require('../utils/student-profile');
const { validateToken, validateAdmin } = require("../JWT");

// student Routers

router.get("/student_details", validateToken, studentData.GetStudents)

router.get("/student_details/:id", validateToken, studentData.GetStudentById)

router.post("/student_details", validateAdmin, profileImage.single('profile_image'), studentData.AddStudent)

router.put("/student_details/:id", validateAdmin, profileImage.single('profile_image'), studentData.UpdateStudent)

router.delete("/student_details/:id", validateAdmin, studentData.DeleteStudent)

router.post("/upload_students", upload.single("file"), studentData.UploadStudentsFromExcel);

router.get('/download_students_excel', studentData.DownloadStudentsExcel);

router.get('/student_analytics', validateToken, studentData.GetStudentCourseCount);

module.exports = router