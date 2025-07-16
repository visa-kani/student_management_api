const activityData = require("../controller/activity-logs.controller")
const router = require('express').Router()

// Activity Routers

router.get("/student_logs", activityData.GetActivityLog)

module.exports = router