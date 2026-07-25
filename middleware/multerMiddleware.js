const multer = require("multer");

// Store uploaded file in diskstorage
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

   const upload = multer({
    storage, limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    },

    fileFilter: (req, file, cb) => {

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "application/pdf"
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only JPG, PNG and PDF files are allowed"), false);
        }
    }
});

module.exports = upload;