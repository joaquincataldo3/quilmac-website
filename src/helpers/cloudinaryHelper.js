const { v2: cloudinary } = require('cloudinary');
const dotenv = require('dotenv');
dotenv.config()
const { env } = process;

cloudinary.config({ 
    cloud_name: env.PROD_CLOUDINARY_CLOUD_NAME || env.DEV_CLOUDINARY_CLOUD_NAME, 
    api_key: env.PROD_CLOUDINARY_API_KEY || env.DEV_CLOUDINARY_API_KEY, 
    api_secret: env.PROD_CLOUDINARY_API_SECRET || env.DEV_CLOUDINARY_API_SECRET
});

module.exports = {
    handleUploadImage: async (file, folder) => {
        try {
            const result = await cloudinary.uploader.upload(file.path, {
                folder
            });
            return result;
        } catch (error) {
            console.log('error in handle upload image')
            console.log(error)
            return null;
        }
    },
    handleDeleteImage: async (imagePublicId) => {
        try {
            const result = await cloudinary.uploader.destroy(imagePublicId);
            return result;
        } catch (error) {
            console.log('error in handle delete image ')
            console.log(error)
            return null;
        }
    }
};