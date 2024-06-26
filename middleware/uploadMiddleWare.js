// uploadMiddleware.js
const multer = require("multer");
const path = require("path");

// Define storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "./uploads/")); // Adjust the destination directory path as needed
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // Specify the filename for the uploaded file
    }
});

// Initialize multer with the specified storage configuration
const upload = multer({ storage });

// Middleware function to handle file upload
const uploadMiddleware = upload.single("file"); // 'file' is the field name for the file input in your form

module.exports = uploadMiddleware;
