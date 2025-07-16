const multer = require("multer");

const storage = multer.memoryStorage(); // store in memory to parse directly
const upload = multer({ storage });

module.exports = upload;
