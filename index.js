const express = require('express')
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const path = require('path');

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// routers
const studentRouters = require("./routes/students.routers");
const facultyRouters = require("./routes/faculty.routers");
const AdminRouters = require("./routes/admin.routers");
const ActivityRouters = require("./routes/activity-logs.routers");
const LoginData = require("./controller/login.controller");

app.use('/student_api', studentRouters)
app.use('/faculty_api', facultyRouters)
app.use('/admin_api', AdminRouters)
app.use('/activity_api', ActivityRouters)
app.use('/login', LoginData.Login)

const PORT = 7001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
