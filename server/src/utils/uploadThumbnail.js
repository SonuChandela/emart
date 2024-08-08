import { uploadImage } from "./cloudinary.js";

export const uploadThumbnail = async (thumb,folder) => {
    if (!thumb) return null;
  
    try {
      const thumbnailCloud = await uploadImage(thumb,folder);
      if (thumbnailCloud) {
        return {
          url: thumbnailCloud.secure_url,
          altText: thumbnailCloud.original_filename,
          type: "thumbnail",
        };
      } else {
        throw new ApiError(500, "Failed to upload thumbnail");
      }
    } catch (error) {
      console.error("Thumbnail upload failed:", error);
      throw new ApiError(500, "Failed to upload thumbnail");
    }
  };