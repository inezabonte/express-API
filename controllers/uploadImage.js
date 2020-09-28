import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

//cloudinary config
cloudinary.config({
  api_key: process.env.API_KEY,
  cloud_name: process.env.CLOUD_NAME,
  api_secret: process.env.API_SECRET,
});

//create an asynchronous function and await the results.
// use try and catch to detect any errors.

export const uploadImage = async (data) => {
  if (data == undefined) return undefined;
  try {
    const result = await cloudinary.uploader.upload(data.tempFilePath);
    return result.url;
  } catch (error) {
    console.log(error);
  }
};
