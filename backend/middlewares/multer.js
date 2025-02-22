// CommonJS Syntax
const multer = require("multer");
const path = require('path');
const fs = require('fs');

// Get __dirname (natively available in CommonJS)
const uploadDir = path.join(__dirname, '../uploads');

(async () => {
    try {
        await fs.promises.mkdir(uploadDir, { recursive: true });
    } catch (err) {
        console.error("❌ Failed to create upload directory:", err);
    }
})();


// Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ 
    storage, 
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});


// CommonJS export
module.exports = upload;
