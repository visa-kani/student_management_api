const adminData = require("../controller/admin-details.controller")
const LoginData = require("../controller/login.controller")
const router = require('express').Router()

// admin Routers

router.get("/admin_details", adminData.GetAdmins)

router.get("/admin_details/:id", adminData.GetAdminById)

router.post("/admin_details", adminData.AddAdmin)

router.put("/admin_details/:id", adminData.UpdateAdmin)

router.delete("/admin_details/:id", adminData.DeleteAdmin)

module.exports = router