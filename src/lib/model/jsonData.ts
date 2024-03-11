import { Schema, model, Document, models } from "mongoose";

interface IJsonData extends Document {
  file: string;
}
const JsonDataSchema = new Schema<IJsonData>(
  {
    file: {
      type: String,
      required: [true, "file is required"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const JsonDataModel = models.JsonData || model<IJsonData>("JsonData", JsonDataSchema);

export default JsonDataModel;
