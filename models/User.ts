import mongoose, { Schema, model, models, Document } from "mongoose";

// TypeScript interface for User document
export interface IUser extends Document {
  name: string;
  documentType: "aadhaar" | "pan" | "dl" | "voterid" | "face" | "digilocker";
  idNumber: string;
  fileName?: string;
  fileData?: string;  // Base64 encoded image or file content
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    documentType: {
      type: String,
      required: true,
      enum: ["aadhaar", "pan", "dl", "voterid", "face", "digilocker"],
    },
    idNumber: { type: String, required: true },
    fileName: { type: String },
    fileData: { type: String }, // store file as Base64 string
  },
  { timestamps: true }
);

const User = models.User || model<IUser>("User", UserSchema);
export default User;
