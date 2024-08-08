import { ApiError } from "./ApiError.js";
import { uploadImage } from "./cloudinary.js";

export const uploadGalleryImg =  async (images,folder) => {
    if(!images || images.length === 0) return [];

    try {
      const uploadedImages = await Promise.all(
        images.map(async (image) => {
          const cloudImage = await uploadImage(image,folder);
          if (cloudImage) {
            return {
              url: cloudImage.secure_url,
              altText: cloudImage.original_filename,
              type: "gallery",
            };
          } else {
            throw new ApiError(500, "Failed to upload image");
          }
        })
      );
    
      return uploadedImages;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw new ApiError(500, "Failed to upload images");
    }
    };