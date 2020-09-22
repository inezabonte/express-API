const cloudinary = require("cloudinary").v2;

//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//create an asynchronous function and await the results.
// use try and catch to detect any errors.

module.exports.uploadImage = async (data) => {
  try {
    const result = await cloudinary.uploader.upload(data.tempFilePath);
    return result.url;
  } catch (error) {
    console.log("Image upload NOT Successful");
  }
};
