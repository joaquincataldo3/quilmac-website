const { v2: cloudinary } = require('cloudinary');
const dotenv = require('dotenv');
const streamifier = require('streamifier');
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
                 console.log('Uploading file:', file.originalname);

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              reject(error);
            } else {
              resolve(result);
            }
          }
        );


        streamifier.createReadStream(file.buffer).pipe(stream);
      });

      console.log('Upload successful:', result.secure_url);
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