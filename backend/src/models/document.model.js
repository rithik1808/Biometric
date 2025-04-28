import mongoose from "mongoose";

const documentScheme = new mongoose.Schema(
  {
    documentName: {
      type: String,
      default: "",
    },
    documentUrl: {
      type: String,
      default: "",
    },
    documentId: {
      type: String,
      default: "",
    },
    documentFormat: {
      type: String,
      default: "",
    },
    documentSize: {
      type: Number,
      default: 0,
    },
    documentDescription: {
      type: String,
      default: "",
    },
    biometric: {
      type: String,
      default: "",
    },
    uploadedBy: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Document", documentScheme);
