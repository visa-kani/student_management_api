const facultyData = require("../controller/faculty-details.controller")
const router = require('express').Router()

// faculty Routers

router.get("/faculty_details", facultyData.GetFaculties)

router.get("/faculty_details/:id", facultyData.GetFacultyById)

router.post("/faculty_details", facultyData.AddFaculty)

router.put("/faculty_details/:id", facultyData.UpdateFaculty)

router.delete("/faculty_details/:id", facultyData.DeleteFaculty)

module.exports = router