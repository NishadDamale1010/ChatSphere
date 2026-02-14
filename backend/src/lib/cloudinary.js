const {vwidget} = require('cloudinary').v2;

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: "No file uploaded"
            });
        }
        const result = await vwidget.upload(req.file.path, {
            folder: 'chatSphere',
            transformation: [   
                { width: 500, height: 500, crop: 'fill' }
            ]
        });
        res.status(200).json({
            success: true,
            imageUrl: result.secure_url
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }   
};

module.exports = {
    uploadImage
};  
