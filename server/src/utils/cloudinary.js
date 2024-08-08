import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

  const uploadImage = async (localFilePath,imgFolder) => {
    const options = {
        resource_type: "auto",
        use_filename : true, 
        unique_filename : false,
        folder: imgFolder ? imgFolder : null
      };

      try {
        
        if(!localFilePath) return null;
        
        const response = await cloudinary.uploader.upload(localFilePath,options);

        fs.unlinkSync(localFilePath)
        return response;
        // return result.public_id; 
      } catch (error) {
        console.error('Cloudinary upload error:', error); // remove the locally saved temporary file as the upload operation got failed
        fs.unlinkSync(localFilePath)
        return null;
      }
  }


  export {uploadImage};