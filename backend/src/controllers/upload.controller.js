import cloudinary from "../utils/cloudinary.js";
import fs from "fs";
import path from "path";

export const uploadFile = async (req, res) => {
  try {
    const file = req.files?.[0];
    const filePath = file.path;
    const originalName = file.originalname;
    const ext = path.extname(originalName).toLowerCase();


    const isImage = /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(ext);
    const resourceType = isImage ? "image" : "raw";


    const publicId = path.parse(originalName).name;
    const finalPublicId =
      resourceType === "raw" ? `${publicId}${ext}` : publicId;

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: resourceType,
      folder: "uploads",
      public_id: finalPublicId,
      use_filename: true,
      unique_filename: false,
    });

    fs.unlinkSync(filePath);

    console.log(result);

    res.json({
      originalName: originalName,
      url: result.secure_url,
      secure_url: result.secure_url,
      public_id: result.public_id,
      format: result.format || ext || "",
      resource_type: result.resource_type,
      display_name: result.display_name,
      bytes: result.bytes,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
