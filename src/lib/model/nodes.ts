import { Schema, model, Document, models } from "mongoose";

interface INodes extends Document {
  file: string;
}
const NodesSchema = new Schema<INodes>(
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

const NodesModel = models.Nodes || model<INodes>("Nodes", NodesSchema);

export default NodesModel;
